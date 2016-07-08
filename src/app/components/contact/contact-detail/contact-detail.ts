import {Component, Input} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

declare var jQuery: any;
import {Contact} from '../../../models/contact';
import {Action, ActionStream} from '../../../streams/action-stream';
import {SideBarService} from '../../../services/sidebar-service';
import {ContactListService, SearchListQuery} from '../../../services/contact-list-service';
import {ClipBoardItem} from './clipboard-item';

@Component({
    selector: 'contact-detail',
    directives: [ROUTER_DIRECTIVES, ClipBoardItem],
    templateUrl: 'app/components/contact/contact-detail/contact-detail.html',
    styleUrls: ['app/components/contact/contact-detail/contact-detail.css']
})
export class ContactDetail {
    private detail: {listId: string, contact:Contact};
    private lists: Object[] = [];
    constructor(private contactListService: ContactListService, private actionStream: ActionStream, private sidebar: SideBarService) {}
    
    show(detail: {listId: string, contact: Contact}) {
        this.detail = detail;
        this.lists = [];
        if (detail && detail.contact.listIds && detail.contact.listIds.length > 0) {
            let query = new SearchListQuery();
            query.ids = detail.contact.listIds;
            query.size = detail.contact.listIds.length;
            this.contactListService.searchList(query)
                .map(res => res.json())
                .subscribe(res => {
                    this.lists = res.content;
                });
        }
        setTimeout(function() {
            jQuery('.contact-detail .ui.dropdown').dropdown();
        }, 500);
    }
    viewList(listId: string) {
        this.detail.listId = listId;
    }
    showDuplicationInfo(contact: Contact) {
        this.actionStream.next(new Action('show-contact-duplication', contact));
    }
    getCsvName() {
        let contact = this.detail.contact;
        if (contact.name) {
            return contact.name;
        }
        return new Date().toDateString();
    }
    csvData() {
        let contact = this.detail.contact;
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += 'Title,First name,Last name,Phone number,Email address,Job title,Company,Street address,City,State\n';
        csvContent += contact.title + ',';
        if (contact.firstName) {
            csvContent += contact.firstName;
        }
        csvContent += ',';
        if (contact.lastName) {
            csvContent += contact.lastName;
        }
        csvContent += ',';
        if (contact.defaultPhoneNumber) {
            csvContent += contact.defaultPhoneNumber;
        }
        csvContent += ',';
        if (contact.defaultEmailAddress) {
            csvContent += contact.defaultEmailAddress;
        }
        csvContent += ',';
        if (contact.jobTitle) {
            csvContent += contact.jobTitle;
        }
        csvContent += ',';
        if (contact.company) {
            csvContent += contact.company;
        }
        csvContent += ',';
        if (contact.streetAddress) {
            csvContent += contact.streetAddress;
        }
        csvContent += ',';
        if (contact.city) {
            csvContent += contact.city;
        }
        csvContent += ',';
        if (contact.state) {
            csvContent += contact.state;
        }
        csvContent += '\n';
        return encodeURI(csvContent);
    }
    
    makeACopy() {
        this.detail.contact.id = undefined;
        if (this.detail.contact.firstName) {
            this.detail.contact.firstName += '(copied)';
        } else {
            this.detail.contact.firstName = '(copied)';
        }
        this.sidebar.next({
            id: 'edit-contact',
            name: 'show',
            data: this.detail,
            from: 'edit'
        });
    }
    edit() {
        this.sidebar.next({
            id: 'edit-contact',
            name: 'show',
            data: this.detail
        });
    }
    hide() {
        this.detail = null;
    }
    close() {
        this.sidebar.next({
            name: 'hide',
            data: this.detail
        });
        this.hide();
    }
}
