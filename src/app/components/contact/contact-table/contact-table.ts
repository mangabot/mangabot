import {Component, ViewChild, Input} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {ActionBar} from './action-bar/action-bar';
import {TableContent} from './table-content/table-content';
import {PaginationBar} from './pagination-bar/pagination-bar';

import {Contact} from '../../../models/contact';
import {ContactList} from '../../../models/contact-list';
import {UserService} from '../../../services/user-service';
import {ContactService, SearchContactQuery} from '../../../services/contact-service';

class PageData {
    constructor(
        public query: SearchContactQuery = new SearchContactQuery(),
        public totalItems: number = 0,
        public totalPageItems: number = 0,
        public totalPages: number = 0, 
        public contacts: Contact[] = [],
        public currentPage: number = 0
    ) {}
}

@Component({
    selector: 'contact-table',
    directives: [ActionBar, TableContent, PaginationBar],
    templateUrl: 'app/components/contact/contact-table/contact-table.html',
    styleUrls: ['app/components/contact/contact-table/contact-table.css']
})
export class ContactTable {
    @ViewChild('paginationBar') paginationBar: PaginationBar;
    @ViewChild('tableContent') tableContent: TableContent;
    @Input() contactList: ContactList;
    public actionInfo = {
        mode: 'SINGLE',
        items: [],
        contactList: undefined,
        total: 0
    };
    private userService: UserService;
    private contactService: ContactService;
    private initialized: boolean = false;
    private loading: boolean = true;
    private pageData: PageData;
    
    constructor(contactService: ContactService, userService: UserService) {
        this.userService = userService;
        this.contactService = contactService;
        this.pageData = new PageData();
    }
    
    ngAfterViewInit() {
        this.paginationBar.update(this.pageData);
        this.contactService.subscribe(updated => {
            this.pageData = new PageData();
            this.actionInfo = {
                mode: 'SINGLE',
                items: [],
                contactList: this.contactList,
                total: 0
            };
            this.search("");
            return updated;
        });
    }
    
    refresh() {
        this.actionInfo = {
            mode: 'SINGLE',
            items: [],
            contactList: this.contactList,
            total: 0
        };
        this.getPage(0);
    }
   
    edit() {
        this.tableContent.viewContact('edit', this.actionInfo.items[0]);
    }
    
    search(keyword) {
        keyword = keyword.trim();
        if (keyword.length > 0 && keyword.indexOf('*') < 0) {
            keyword = '*' + keyword + '*';
        }
        this.pageData.query.keyword = keyword;
        this.getPage(0);
    }
    
    selectAll() {
        this.actionInfo.mode = 'ALL';
    }
    
    clearSelection() {
        this.actionInfo.mode = 'SINGLE';
        this.tableContent.clearSelection();
    }
    
    selectionChange(items) {
        this.actionInfo.items = items;
        if (this.pageData.contacts.length == items.length && this.pageData.totalPages > 1) {
            this.actionInfo.mode = 'PAGE';
        } else {
            this.actionInfo.mode = 'SINGLE';
        }
    }
    
    getPage(page: number) {
        this.pageData.query.page = page;
        if (this.contactList && this.contactList.id != 'all') {
            this.pageData.query.listId = this.contactList.id;
        } else {
            this.pageData.query.listId = undefined;
        }
        this.loading = true;
        this.contactService.searchContact(this.pageData.query)
            .map(res => res.json())
            .subscribe(
                res => {
                    let contacts: Contact[] = [];
                    res.content.forEach(item => {
                        for (var i = 0; i < item.emails.length; i++) {
                            if (item.emails[i].default) {
                                item.defaultEmailAddress = item.emails[i].emailAddress;
                                break;
                            }
                        }
                        for (var i = 0; i < item.phones.length; i++) {
                            if (item.phones[i].default) {
                                item.defaultPhoneNumber = item.phones[i].phoneNumber;
                                break;
                            }
                        }
                        contacts.push(new Contact(
                            item.title,
                            item.name,
                            item.firstName,
                            item.lastName,
                            item.defaultEmailAddress,
                            item.emails,
                            item.defaultPhoneNumber,
                            item.phones,
                            item.jobTitle,
                            item.company,
                            item.streetAddress,
                            item.state,
                            item.city,
                            item.duplicateInfo,
                            new Date(item.createdAt),
                            new Date(item.updatedAt),
                            item.stared,
                            null,
                            item.id,
                            item.listIds
                        ));
                    }); 
                    this.pageData.contacts = contacts;
                    this.pageData.totalItems = res.totalElements;
                    this.actionInfo.total = res.totalElements;
                    this.pageData.totalPageItems = res.numberOfElements;
                    this.pageData.totalPages = res.totalPages;
                    this.pageData.currentPage = page;
                    this.paginationBar.update(this.pageData);
                    this.initialized = true;
                    this.loading = false;
                },
                err => {
                    this.loading = false;
                }
            );
    }
}
