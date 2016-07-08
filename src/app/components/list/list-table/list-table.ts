import {Component, ViewChild} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {ActionBar} from './action-bar/action-bar';
import {TableContent} from './table-content/table-content';
import {PaginationBar} from './pagination-bar/pagination-bar';

import {ContactList} from '../../../models/contact-list';
import {UserService} from '../../../services/user-service';
import {ContactListService, SearchListQuery} from '../../../services/contact-list-service';

class PageData {
    constructor(
        public query: SearchListQuery = new SearchListQuery(),
        public totalItems: number = 0,
        public totalPageItems: number = 0,
        public totalPages: number = 0, 
        public contactLists: ContactList[] = [],
        public currentPage: number = 0
    ) {}
}

@Component({
    selector: 'list-table',
    directives: [ActionBar, TableContent, PaginationBar],
    templateUrl: 'app/components/list/list-table/list-table.html',
    styleUrls: ['app/components/list/list-table/list-table.css']
})
export class ListTable {
    @ViewChild('paginationBar') paginationBar: PaginationBar;
    @ViewChild('tableContent') tableContent: TableContent;
    public actionInfo = {
        mode: 'SINGLE',
        items: [],
        total: 0
    };
    private userService: UserService;
    private contactListService: ContactListService;
    private initialized: boolean = false;
    private loading: boolean = true;
    private pageData: PageData;
     
    constructor(contactListService: ContactListService, userService: UserService) {
        this.userService = userService;
        this.contactListService = contactListService;
        this.pageData = new PageData();
    }
    
    ngAfterViewInit() {
        this.loading = true;
        this.paginationBar.update(this.pageData);
        this.contactListService.subscribe(updated => {
            this.pageData = new PageData();
            this.actionInfo = {
                mode: 'SINGLE',
                items: [],
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
            total: 0
        };
        this.getPage(0);
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
        if (this.pageData.contactLists.length == items.length && this.pageData.totalPages > 1) {
            this.actionInfo.mode = 'PAGE';
        } else {
            this.actionInfo.mode = 'SINGLE';
        }
    }
    
    getPage(page: number) {
        this.pageData.query.page = page;
        this.loading = true;
        this.contactListService.searchList(this.pageData.query)
            .map(res => res.json())
            .subscribe(
                res => {
                    let contactLists: ContactList[] = [];
                    res.content.forEach(item => {
                        contactLists.push(new ContactList(
                            item.name, 
                            item.numberOfContacts,
                            item.numberOfEmails,
                            item.numberOfPhones,
                            item.numberOfDuplications,
                            new Date(item.updatedAt),
                            item.stared,
                            null,
                            item.id,
                            item.duplicateNameCases,
                            item.duplicateEmailCases,
                            item.duplicatePhoneCases
                        ));
                    }); 
                    this.pageData.contactLists = contactLists;
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
