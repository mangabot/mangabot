import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {FieldSelector} from './field-selector';
import {Action, ActionStream} from '../../../../streams/action-stream';
import {ContactList} from '../../../../models/contact-list';
import {ContactListService, SearchListQuery} from '../../../../services/contact-list-service';
import {NotificationService, Message, Status as MStatus} from '../../../../services/notification-service';
declare var jQuery: any;

@Component({
    selector: 'lm-import-matching',
    directives: [FieldSelector],
    templateUrl: 'app/components/modals/list/import-matching/import-matching.html',
    styleUrls: ['app/components/modals/list/import-matching/import-matching.css']
})
export class LmImportMatching {
    private id = '#lm-import-matching';
    private header = [
        'Title', 
        'First name', 
        'Last name', 
        'Phone number', 
        'Email address', 
        'Job title', 
        'Company', 
        'Street address',
        'City',
        'State',
        'Excluded'
    ];
    private fields: string[] = [];
    private indicator: {};
    private hasHeader: boolean;
    private listName: string;
    private fileName: string;
    private fileUrl: string;
    private selectedOption: string;
    private stared: boolean;
    private canSubmit: boolean = false;
    
    constructor(
        private contactListService: ContactListService, 
        private notificationService: NotificationService,
        actionStream: ActionStream) {
        actionStream.getStream()
            .filter(action => action.id == 'show-import-matching')
            .subscribe(action => {
                this.show(action.data);
            });
    }
    ngAfterViewInit() {
        let self = this;
        jQuery(this.id + ' .ui.toggle.checkbox').checkbox();
        jQuery(this.id).modal({
            onHide: function() {
            },
            onDeny: function(){
            },
            onApprove: function() {
                self.submit();
            }
        });
    }
    show(event: {
            needMatching: boolean, 
            fields: string[], 
            indicator: Object, 
            listName: string,
            selectedOption: string, 
            fileName: string,
            fileUrl: string,
            stared: boolean}) {
        this.hasHeader = true;
        this.fields = event.fields;
        this.indicator = event.indicator;
        this.listName = event.listName;
        this.selectedOption = event.selectedOption;
        this.fileName = event.fileName;
        this.fileUrl = event.fileUrl;
        this.stared = event.stared;
        this.canSubmit = this.checkIndicator();
        if (event.needMatching) {
            jQuery(this.id).modal('show');
        } else {
            this.submit();
        }
    }
    setField(index: number, data: {text: string}) {
        let oldText = this.getField(index);
        this.indicator[oldText] = -1;
        this.indicator[data.text] = index;
        this.canSubmit = this.checkIndicator();
    }
    getField(index: number) {
        for (let header in this.indicator) {
            if (this.indicator[header] == index) {
                return header;
            }
        }
        return 'Excluded';
    }
    checkIndicator() {
        console.log(this.indicator);
        for (var key in this.indicator) {
            if (key != 'Excluded' && this.indicator[key] >= 0) {
                return true;
            }
        }
        return false;
    }
    submit() {
        let contactList = undefined;
        let ids = undefined;
        if (this.selectedOption == 'add-listName' || this.selectedOption == 'add-fileName') {
            contactList = new ContactList(this.listName);
        } else {
            ids = [this.selectedOption];
        }
        this.contactListService
            .importList(contactList, ids, this.stared, 
                this.fileName, this.fileUrl, 
                {hasHeader: this.hasHeader, indicator: this.indicator})
            .map(res => res.json())
            .subscribe(res => {
                setTimeout(() => {
                    this.notificationService.notify(new Message(
                        MStatus.SUCCESS,
                        'Import request accepted', 
                        '', 
                        'An notification email will be sent after completed.',
                        {text: 'View list detail', route: ['Contact', {listId: res[0]}]}
                    ));
                }, 3000);
            }, err => {
                this.notificationService.notify(new Message(
                    MStatus.ERROR,
                    'Error!', 
                    'Service is unavailable.', 
                    'Please try again later!'
                ));
            });
    }
}
