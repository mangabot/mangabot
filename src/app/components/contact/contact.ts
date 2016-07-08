import {Component} from 'angular2/core';
import {COMMON_DIRECTIVES} from 'angular2/common';
import {RouteParams} from 'angular2/router';

import {Notification} from '../notification/notification';
import {HeaderBar} from './header-bar/header-bar';
import {ContactTable} from './contact-table/contact-table';
import {ContactList} from '../../models/contact-list';
import {RouteService} from '../../services/route-service';
import {ContactService} from '../../services/contact-service';
import {ContactListService, SearchListQuery} from '../../services/contact-list-service';

@Component({
    selector: 'contact',
    directives: [COMMON_DIRECTIVES, Notification, HeaderBar, ContactTable],
    template: `
        <notification></notification>
        <header-bar [contactList]="contactList"></header-bar>
        <contact-table [contactList]="contactList"></contact-table>
    `
})
export class Contact {
    private listId: string;
    private contactList: ContactList;
    
    constructor(params: RouteParams, public contactListService: ContactListService, public contactService: ContactService, routeService: RouteService) {
        routeService.next(params);
        this.listId = params.get('listId');
        this.change();
        contactService.subscribe(change => {this.change();});
    }
    
    change() {
        if (this.listId != 'all') {
            let searchListQuery = new SearchListQuery();
            searchListQuery.id = this.listId;
            this.contactListService.searchList(searchListQuery)
                .map(res => res.json())
                .subscribe(res => {
                    if (res.totalElements == 1) {
                        let item = res.content[0];
                        this.contactList = new ContactList(
                            item.name, 
                            item.numberOfContacts,
                            item.numberOfEmails,
                            item.numberOfPhones,
                            item.numberOfDuplications,
                            new Date(item.updatedAt),
                            item.stared,
                            null,
                            item.id
                        );
                    }
                });
        } else {
            this.contactService.getStatistic()
                .map(res => res.json())
                .subscribe(res => {
                    this.contactList = new ContactList(
                        "All contacts", 
                        res.numberOfItems,
                        res.numberOfEmails,
                        res.numberOfPhones,
                        res.numberOfDuplications,
                        null,
                        null,
                        null,
                        "all"
                    );
                });
        }
    }
}
