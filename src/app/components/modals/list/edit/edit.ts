import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {Control} from 'angular2/common';
import {Response} from 'angular2/http'
declare var jQuery: any;

import {Action, ActionStream} from '../../../../streams/action-stream';
import {UserService} from '../../../../services/user-service';
import {ContactListService, SearchListQuery} from '../../../../services/contact-list-service';
import {ContactList} from '../../../../models/contact-list';

@Component({
    selector: 'lm-edit',
    templateUrl: 'app/components/modals/list/edit/edit.html',
    styleUrls: ['app/components/modals/list/edit/edit.css']
})
export class LmEdit {
    private id = "#lm-edit";
    private list: ContactList;
    private name = new Control('');
    private isError = false;
    
    constructor(private contactListService: ContactListService, 
        private userService: UserService, 
        actionStream: ActionStream) {
        actionStream.getStream()
            .filter(action => action.id == 'edit-list')
            .subscribe(action => {
                this.list = action.data;
                this.show();
            });
    }
    
    ngAfterViewInit() {
        jQuery(this.id).modal({
            onHide: () => {
            },
            onDeny: () => {
            },
            onApprove: () => {
                this.canEdit();
                return false;
            }
        });
    }
    
    editList() {
        let contactList = this.list;
        contactList.name = this.name.value.trim();
        this.contactListService
            .updateList(contactList)
            .map(res => res.json())
            .subscribe(
                res => {
                    console.log(res);
                },
                err => console.log(err)
            );
    }
    
    show() {
        this.isError = false;
        this.name = new Control('');
        this.name.valueChanges
            .subscribe(value => {
                if (this.isError === true) {
                    this.isError = false;
                }
            });
        jQuery(this.id).modal('show');
    }
    
    canEdit() {
        if (this.name.value.trim().length > 0) {
            let query = new SearchListQuery(String(this.name.value), 0, 1000000);
            this.contactListService.searchList(query)
                .map(res => (<Response>res).json())
                .subscribe(res => {
                    let items: {name: string}[] = res.content;
                    this.isError = items.filter(item => item.name == this.name.value.trim()).length > 0;
                    if (!this.isError) {
                        this.editList();
                        jQuery(this.id).modal('hide');
                    }
                });
        }
    }
}

