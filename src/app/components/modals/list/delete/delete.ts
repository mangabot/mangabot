import {Component, Output, EventEmitter} from 'angular2/core';
declare var jQuery: any;

import {ContactListService} from '../../../../services/contact-list-service';
import {Action, ActionStream} from '../../../../streams/action-stream';

@Component({
    selector: 'lm-delete',
    templateUrl: 'app/components/modals/list/delete/delete.html',
    styleUrls: ['app/components/modals/list/delete/delete.css'],
})
export class LmDelete {
    private id = '#lm-delete';
    private deleteContacts: boolean = true;
    private actionInfo: {
        mode: string,
        items: {id: string}[]
    };
    
    constructor(private contactListService: ContactListService, actionStream: ActionStream) {
        actionStream.getStream()
            .filter(action => action.id == 'delete-list')
            .subscribe(action => {
                this.actionInfo = action.data;
                this.show();
            });
    }
    
    ngAfterViewInit() {
        let self = this;
        jQuery(this.id + ' .ui.checkbox').checkbox({
            onChecked: function () {
                self.deleteContacts = true;
            },
            onUnchecked: function () {
                self.deleteContacts = false;
            }
        });
        jQuery(this.id).modal({
            onHide: function() {
            },
            onDeny: function(){
            },
            onApprove: function() {
                self.delete();
            }
        });
    }
    
    show() {
        this.deleteContacts = false;
        jQuery(this.id + ' .ui.checkbox').checkbox('set unchecked');
        jQuery(this.id).modal('show');
    }
    
    delete() {
        var ids = this.actionInfo.items.map(l => l.id);
        this.actionInfo.items = [];
        this.contactListService.deleteList(ids, this.deleteContacts, this.actionInfo.mode == 'ALL')
            .subscribe(res => {
            });
    }
}
