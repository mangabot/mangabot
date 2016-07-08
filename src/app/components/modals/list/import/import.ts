import {Component, Output, EventEmitter} from 'angular2/core';
import {Router} from 'angular2/router';
import {Response} from 'angular2/http'
import {Subject} from 'rxjs/Rx';

import {Action, ActionStream} from '../../../../streams/action-stream';
import {User} from '../../../../models/user';
import {ContactList} from '../../../../models/contact-list';
import {UserService} from '../../../../services/user-service';
import {ContactListService, SearchListQuery} from '../../../../services/contact-list-service';
import {NotificationService, Message, Status as MStatus} from '../../../../services/notification-service';
import {S3Service, Uploader, Status, UploadEvent} from '../../../../services/s3-service';

declare var jQuery: any;
declare var Papa: any;
class Indicator {
    public fieldMapper = {
        "title": "Title",
        "firstname": "First name",
        "lastname": "Last name",
        "emailaddress": "Email address",
        "phonenumber": "Phone number",
        "jobtitle": "Job title",
        "company": "Company",
        "streetaddress": "Street address",
        "city": "City",
        "state": "State"
    };
    public header: string[] = [];
    public matches: number = 0;
    constructor(public indicator?: Object) {
        if (!this.indicator) {
            this.indicator = {
                "Title": -1,
                "First name": -1,
                "Last name": -1,
                "Email address": -1,
                "Phone number": -1,
                "Job title": -1,
                "Company": -1,
                "Street address": -1,
                "City": -1,
                "State": -1
            };
        }
    }
    match(header: string[]) {
        this.header = header;
        this.matches = 0;
        for (let i = 0; i < header.length; ++i) {
            var h = header[i].replace(/\s/g, '').toLowerCase();
            h = this.fieldMapper[h];
            if (this.indicator[h]) {
                this.indicator[h] = i;
                ++this.matches;
            }
        }
    }
    shouldDoManualMatching() {
        return this.matches != this.header.length;
    }
};

@Component({
    selector: 'lm-import',
    templateUrl: 'app/components/modals/list/import/import.html',
    styleUrls: ['app/components/modals/list/import/import.css']
})
export class LmImport {
    private id = "#lm-import";
    private term = new Subject();
    private fileName = '';
    private listName = '';
    private stared = true;
    private indicator = new Indicator();
    private uploadEvent: UploadEvent = new UploadEvent(Status.NONE, 0);
    private uploader: Uploader;
    private options: ContactList[] = [];
    private user: User;
    private selectedOption: string;
    
    constructor(
        private s3Service: S3Service, 
        private userService: UserService, 
        private contactListService: ContactListService,
        private notificationService: NotificationService, 
        private actionStream: ActionStream) {
        actionStream.getStream()
            .filter(action => action.id == 'import-list')
            .subscribe(action => {
                this.show();
            });
    }
    
    ngAfterViewInit() {
        let self = this;
        this.term
            .debounceTime(400).distinctUntilChanged()
            .switchMap(term => {
                self.listName = String(term).trim();
                let query = new SearchListQuery('*' + self.listName + '*', 0, 10);
                return this.contactListService.searchList(query);
            })
            .map(res => (<Response>res).json())
            .subscribe(res => {
                let options = res.content as [];
                this.options = options.map(option => new ContactList(
                    option['name'], 
                    option['numberOfContacts'], 
                    option['numberOfEmails'], 
                    option['numberOfPhones'], 
                    option['numberOfDuplications'],
                    option['updatedAt'],
                    option['stared'],
                    null,
                    option['id']
                ));
            });
        jQuery(this.id).modal({
            onHide: function() {
            },
            onDeny: function(){
            },
            onApprove: function() {
            }
        });
        this.attachSearchEvent();
    }
    
    canCreate(name: string) {
        return name.trim().length > 0 && this.options.filter(o => o.name == name.trim()).length == 0;
    }
    
    attachSearchEvent() {
        let self = this;
        jQuery(this.id + ' .ui.fluid.selection.dropdown').dropdown({
            maxSelections: 1,
            action: 'combo',
            fullTextSearch: true,
            message: {
                addResult     : '',
                count         : '',
                maxSelections : '',
                noResults     : ''
            },
            onChange: function(value, text, $choice) {
                if (!value || value.trim().length == 0 || value.indexOf('add') == 0) {
                    self.selectedOption = value;
                } else {
                    let items = value.split('|');
                    self.selectedOption = items[0];
                    self.stared = items[1].toLowerCase() == 'true';
                }
                if (value.length == 0) {
                    jQuery(self.id + ' .ui.fluid.search.dropdown input.search').removeClass('hide')
                } else {
                    jQuery(self.id + ' .ui.fluid.search.dropdown input.search').addClass('hide');
                }
            }
        });
        let searchBox = jQuery(this.id + ' .ui.fluid.search.dropdown input.search');
        searchBox.attr('maxlength', '50');
        searchBox.keyup(function() {
            self.listName = searchBox.val();
            self.term.next(searchBox.val());
        });
    }
    
    verifyHeader(file) {
        var self = this;
        Papa.parse(file, {
            worker: true,
            step: function(results, parser) {
                if (results.data && results.data.length > 0) {
                    self.indicator.match(results.data[0]);
                    parser.abort();
                }
            },
            error: function(err, file, inputElem, reason) {
                this.actionStream.next(new Action('show-warning'));
            }
        });
    }
    
    removeExt(fileName:string) {
        return fileName.replace(/\.[a-z0-i]+$/i, '').trim();
    }
    
    isValidFileType(file: {name: string, type: string}) {
        return /.*\.csv$/.test(file.name) || file.type == 'text/csv';
    }
    
    onFileChange(event) {
        this.options = [];
        this.selectedOption = null;
        this.term.next('');
        this.indicator = new Indicator();
        this.listName = '';
        this.stared = true;
        this.uploadEvent = new UploadEvent(Status.NONE, 0)
        if (event.target.files.length > 0) {
            let file = event.target.files[0];
            if (!this.isValidFileType(file)) {
                this.actionStream.next(new Action('show-warning'));
                return;
            }
            jQuery(this.id).modal('show');
            jQuery(this.id + ' .ui.fluid.selection.dropdown').dropdown('clear');
            
            this.user = this.userService.getCurrentUser();
            this.fileName = file.name;
            
            this.term.next(this.removeExt(this.fileName));
            
            let key = this.user.uuid + '/' + this.user.initiatorUid + '/' + new Date().getTime() + '-' + this.fileName;
            var progressBar = jQuery(this.id + " .ui.progress");
            progressBar.progress({
                percent: 0
            });
            this.uploader = this.s3Service.upload(file, key, file.type)
                .subscribe(res => {
                    this.uploadEvent = res;
                    if (this.uploadEvent.status == Status.PROCESSING || this.uploadEvent.status == Status.COMPLETED) {
                        progressBar.progress({percent: this.uploadEvent.percentage});
                    } else if (this.uploadEvent.status == Status.CANCELED) {
                        this.notificationService.notify(new Message(
                            MStatus.ERROR,
                            'Import canceled!', 
                            '', 
                            'No list was created.'
                        ));
                        this.close();
                    }
                }, err => {
                    console.log(err);
                });
            this.verifyHeader(file);
        }
    }
    
    canImport() {
        return this.selectedOption != null && 
            this.selectedOption.trim().length > 0 && 
            this.uploadEvent.status == Status.COMPLETED;
    }
    
    import() {
        if (this.canImport()) {
            let listName = this.listName;
            if (this.selectedOption == 'add-fileName') {
                listName = this.removeExt(this.fileName);
            }
            
            // encode file name
            var fileUrl = this.uploader.fileUrl.split('/');
            fileUrl[fileUrl.length - 1] = encodeURIComponent(fileUrl[fileUrl.length - 1]);
            fileUrl = fileUrl.join('/');
            
            let action = new Action('show-import-matching', {
                needMatching: this.indicator.shouldDoManualMatching(), 
                fields: this.indicator.header, 
                indicator: this.indicator.indicator, 
                listName: listName,
                selectedOption: this.selectedOption, 
                fileName: this.fileName,
                fileUrl: fileUrl,
                stared: this.stared
            });
            this.actionStream.next(action);
        }
    }
    
    close() {
        jQuery(this.id).modal('hide');
    }
    
    show() {
        jQuery(this.id + ' #upload')[0].reset();
        jQuery(this.id + ' #file').click();
    }
}
