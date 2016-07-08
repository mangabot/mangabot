import {Router} from 'angular2/router';
import {Component, Input, Output, EventEmitter} from 'angular2/core';
declare var jQuery: any;

import {TimeFromNowPipe} from '../../../../pipes/time-from-now';
import {User} from '../../../../models/user';
import {ContactList} from '../../../../models/contact-list';
import {UserService} from '../../../../services/user-service';
import {Action, ActionStream} from '../../../../streams/action-stream';
import {ContactListService} from '../../../../services/contact-list-service';

import {CheckBox} from './checkbox';

@Component({
    selector: 'table-content',
    directives: [CheckBox],
    pipes: [TimeFromNowPipe],
    styleUrls: ['app/components/list/list-table/table-content/table-content.css'],
    templateUrl: 'app/components/list/list-table/table-content/table-content.html'
})
export class TableContent {
    @Input() user: User;
    @Input() initialized: boolean;
    @Input() loading: boolean;
    @Input() contactLists: ContactList[];
    @Output() refresh = new EventEmitter();
    @Output() selectionChange = new EventEmitter();
    
    private selectedItems: ContactList[] = [];
    
    constructor(private userService: UserService, 
        private contactListService: ContactListService,
        private actionStream: ActionStream,
        private router: Router) {}
    
    selectAll() {
        this.selectedItems = [].concat(this.contactLists);
        this.selectionChange.emit(this.selectedItems);
        jQuery('.table-content .list-item-selector').checkbox('set checked');
    }
    
    clearSelection() {
        this.selectedItems = [];
        this.selectionChange.emit(this.selectedItems);
        jQuery('.table-content .list-item-selector').checkbox('set unchecked');
        jQuery('.table-content #select-all-list').checkbox('set unchecked');
    }
    
    selectList(event) {
        this.selectedItems.push(event.data);
        this.selectionChange.emit(this.selectedItems);
        if (jQuery('.table-content .list-item-selector input:checked').length == this.contactLists.length) {
            jQuery('.table-content #select-all-list').checkbox('set checked');
        }
    }
    showListDuplication(list) {
        this.actionStream.next(new Action('show-list-duplication', list));
    }
    clearListSelection(event) {
        this.selectedItems = this.selectedItems.filter(value => value.id != event.data.id);
        this.selectionChange.emit(this.selectedItems);
        jQuery('.table-content #select-all-list').checkbox('set unchecked');
    }
    star(contactList: ContactList) {
        let user = this.userService.getCurrentUser();
        // let stared = contactList.isStared(user);
        // if (stared) {
        //     let stars = contactList.stars
        //         .filter(u => u.uuid != user.uuid && u.initiatorUid != user.initiatorUid);
        //     contactList.stars = stars;
        // } else {
        //     let stars = contactList.stars;
        //     if (!stars) {
        //         stars = [];
        //     }
        //     stars.push(user);
        //     contactList.stars = stars;
        // }
        this.contactListService.starList(contactList.id, !contactList.stared)
            .subscribe(res => {
                contactList.stared = !contactList.stared;
            }, err => {
            });
    }
    viewList(listId:string) {
        this.router.navigateByInstruction(this.router.generate(['Contact', {listId: listId}])); 
    }
    showList(event, contactList: ContactList) {
        if (event.srcElement.className.indexOf('child-control') < 0) {
            this.viewList(contactList.id);
        }
    }
}
