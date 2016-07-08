import {Component, Output, EventEmitter} from 'angular2/core';
import {ContactService} from '../../../../services/contact-service';
import {Action, ActionStream} from '../../../../streams/action-stream';
declare var jQuery: any;

@Component({
    selector: 'cm-remove',
    templateUrl: 'app/components/modals/contact/remove/remove.html',
    styleUrls: ['app/components/modals/contact/remove/remove.css'],
})
export class CmRemove {
    private id = '#cm-remove';
    private actionInfo: {
        contactList: {id: string},
        items: {id: string}[],
        mode: string
    };
    
    constructor(private contactService: ContactService, actionStream: ActionStream) {
        actionStream.getStream()
            .filter(action => action.id == 'remove-contact')
            .subscribe(action => {
                this.actionInfo = action.data;
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
                self.remove();
            }
        });
    }
    
    remove() {
        let ids = this.actionInfo.items.map(i => i.id);
        this.actionInfo.items = [];
        console.log(this.actionInfo);
        let listId = this.actionInfo.contactList.id;
        this.contactService.removeContact(ids, listId, this.actionInfo.mode == 'ALL')
            .subscribe(res => {
            });
    }
    
    show() {
        jQuery(this.id).modal('show');
    }
}
