import {Component, Output, EventEmitter} from 'angular2/core';
import {ContactService} from '../../../../services/contact-service';
import {Action, ActionStream} from '../../../../streams/action-stream';
declare var jQuery: any;

@Component({
    selector: 'cm-delete',
    templateUrl: 'app/components/modals/contact/delete/delete.html',
    styleUrls: ['app/components/modals/contact/delete/delete.css'],
})
export class CmDelete {
    private id = '#cm-delete';
    private actionInfo: {
        contactList: {id: string},
        items: {id: string}[],
        mode: string
    };
    
    constructor(private contactService: ContactService, actionStream: ActionStream) {
        actionStream.getStream()
            .filter(action => action.id == 'delete-contact')
            .subscribe(action => {
                this.actionInfo = action.data;
                this.show();
            });
    }
    ngAfterViewInit() {
        let self = this;
        jQuery(this.id).modal({
            onHide: function() {
                self.actionInfo = undefined;
            },
            onDeny: function(){
                self.actionInfo = undefined;
            },
            onApprove: function() {
                self.delete();
            }
        });
    }
    delete() {
        let ids = [];
        if (this.actionInfo.mode != 'ALL') {
            ids = this.actionInfo.items.map(i => i.id);
        }
        this.contactService.deleteContact(ids, this.actionInfo.contactList.id, this.actionInfo.mode == 'ALL')
            .subscribe(res => {
            });
        this.actionInfo.items = [];
        this.actionInfo.mode = 'SINGLE';
        this.actionInfo = undefined;
    }
    show() {
        jQuery(this.id).modal('show');
    }
}
