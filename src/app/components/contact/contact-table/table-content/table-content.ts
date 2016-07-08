import {Component, Input, Output, EventEmitter} from 'angular2/core';
declare var jQuery: any;

import {User} from '../../../../models/user';
import {Contact} from '../../../../models/contact';
import {ContactList} from '../../../../models/contact-list';
import {Action, ActionStream} from '../../../../streams/action-stream';
import {UserService} from '../../../../services/user-service';
import {ContactService} from '../../../../services/contact-service';
import {SideBarService} from '../../../../services/sidebar-service';

import {CheckBox} from './checkbox';

@Component({
    selector: 'table-content',
    directives: [CheckBox],
    styleUrls: ['app/components/contact/contact-table/table-content/table-content.css'],
    templateUrl: 'app/components/contact/contact-table/table-content/table-content.html'
})
export class TableContent {
    @Input() user: User;
    @Input() contactList: ContactList;
    @Input() contacts: Contact[];
    @Input() initialized: boolean;
    @Input() loading: boolean;
    @Output() refresh = new EventEmitter();
    @Output() selectionChange = new EventEmitter();
    
    private selectedItems: Contact[] = [];
    private selectedContactId: string;
    
    constructor(private userService: UserService, 
        private contactService: ContactService, 
        private actionStream: ActionStream,
        private sidebar: SideBarService) {}
    
    ngAfterViewInit() {
        this.sidebar.subscribe(action => {
            if (action.name == 'hide') {
                this.selectedContactId = undefined;
            }
        });
    }
    
    selectAll() {
        this.selectedItems = [].concat(this.contacts);
        this.selectionChange.emit(this.selectedItems);
        jQuery('.table-content .contact-item-selector').checkbox('set checked');
    }
    
    viewContact(event, contact: Contact) {
        if (event == 'edit' || event.srcElement.className.indexOf('child-control') < 0) {
            let action = {
                id: 'show-contact',
                name: 'show',
                data: {
                    listId: this.contactList.id,
                    contact: contact,
                    from: 'edit'
                }
            }
            if (event == 'edit') {
                action.id = 'edit-contact';
            }
            this.selectedContactId = contact.id;
            this.sidebar.next(action);
        }
    }
    
    showDuplicationInfo(contact: Contact) {
        this.actionStream.next(new Action('show-contact-duplication', contact));
    }
    
    clearSelection() {
        this.selectedItems = [];
        this.selectionChange.emit(this.selectedItems);
        jQuery('.table-content .contact-item-selector').checkbox('set unchecked');
        jQuery('.table-content #select-all-contact').checkbox('set unchecked');
    }
    
    selectContact(event) {
        this.selectedItems.push(event.data);
        this.selectionChange.emit(this.selectedItems);
        if (jQuery('.table-content .contact-item-selector input:checked').length == this.contacts.length) {
            jQuery('.table-content #select-all-contact').checkbox('set checked');
        }
    }
    
    clearContactSelection(event) {
        this.selectedItems = this.selectedItems.filter(value => value.id != event.data.id);
        this.selectionChange.emit(this.selectedItems);
        jQuery('.table-content #select-all-contact').checkbox('set unchecked');
    }
    
    star(contact: Contact) {
        let user = this.userService.getCurrentUser();
        // let stared = contact.isStared(user, this.contactList.id);
        // if (stared) {
        //     let stars = contact.stars
        //         .filter(star => star.user.uuid != user.uuid && 
        //             star.user.initiatorUid != user.initiatorUid &&
        //             star.listId == this.contactList.id);
        //     contact.stars = stars;
        // } else {
        //     let stars = contact.stars;
        //     if (!stars) {
        //         stars = [];
        //     }
        //     stars.push(new Star(user, this.contactList.id));
        //     contact.stars = stars;
        // }
        this.contactService.starContact(contact.id, this.contactList.id, !contact.stared)
            .subscribe(res => {
                contact.stared = !contact.stared;
            }, err => {
            });
    }
}
