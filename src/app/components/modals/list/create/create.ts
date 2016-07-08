import {Component, Output, EventEmitter} from 'angular2/core';
import {Control} from 'angular2/common';
import {Response} from 'angular2/http'
declare var jQuery: any;

import {UserService} from '../../../../services/user-service';
import {Action, ActionStream} from '../../../../streams/action-stream';
import {ContactListService, SearchListQuery} from '../../../../services/contact-list-service';
import {ContactList} from '../../../../models/contact-list';

@Component({
    selector: 'lm-create',
    templateUrl: 'app/components/modals/list/create/create.html',
    styleUrls: ['app/components/modals/list/create/create.css']
})
export class LmCreate {
    private isStared = false;
    private name = new Control();
    private isError = false;
    private isProcessing = false;
    private id = "#lm-create";
    
    constructor(private contactListService: ContactListService, 
        private userService: UserService, private actionStream: ActionStream) {
        this.name.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .switchMap(term => {
                let query = new SearchListQuery(String(term), 0, 1000000);
                this.isProcessing = true;
                return this.contactListService.searchList(query);
            })
            .map(res => (<Response>res).json())
            .subscribe(res => {
                let items: {name: string}[] = res.content;
                this.isError = items.filter(item => item.name == this.name.value.trim()).length > 0;
                this.isProcessing = false;
            });
         this.actionStream
            .getStream()
            .filter(action => action.id == 'create-list')
            .subscribe(action => {
                this.show();
            });
    }
    
    ngAfterViewInit() {
        let self = this;
        jQuery(this.id).modal({
            onHide: function() {
            },
            onDeny: function(){
            },
            onApprove: function() {
                self.createList();
            }
        });
    }
    
    createList() {
        if (this.canCreate()) {
            let contactList = new ContactList(this.name.value);
            if (this.isStared) {
                let user = this.userService.getCurrentUser();
                contactList.stared = this.isStared;
                contactList.name = contactList.name.trim();
            }
            this.contactListService
                .addList(contactList)
                .map(res => res.json())
                .subscribe(
                    res => {
                        console.log(res);
                    },
                    err => console.log(err)
                );
            this.isStared = false;
        }
    }
    
    show() {
        this.isStared = false;
        this.isError = false;
        this.name.updateValue('');
        jQuery(this.id).modal('show');
    }
    
    canCreate() {
        return this.name.value && !this.isProcessing && !this.isError && this.name.value.trim().length > 0;
    }
    
    star() {
        this.isStared = !this.isStared;
    }
}

