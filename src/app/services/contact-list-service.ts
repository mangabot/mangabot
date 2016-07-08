import {Injectable} from 'angular2/core';
// import {URLSearchParams} from 'angular2/http';
import {CustomURLSearchParams as URLSearchParams} from '../utils/custom-url-search-params';

import {ContactList} from '../models/contact-list';
import {BackendService, CommandData} from './backend-service';
import {BehaviorSubject} from 'rxjs/Rx';

export const SearchOrder = {
    DESC: 'DESC',
    ASC: 'ASC'
};

export class SearchListQuery {
    constructor(
        public keyword?: string,
        public page?: number,
        public size: number = 8,
        public orderField?: string,
        public orderMode?: string,
        public stared?: boolean,
        public id?: string,
        public ids?: string[]
    ) {}
    
    getQueryParameters() {
        let query = {};
        if (this.keyword != undefined) {
            query["keyword"] = this.keywordFilter(this.keyword);
        }
        if (this.stared != undefined) {
            query["stared"] = String(this.stared);
        }
        if (this.orderField != undefined) {
            if (this.orderMode == undefined) {
                this.orderMode = SearchOrder.DESC;
            }
            query["orderField"] = this.orderField;
            query["orderMode"] = this.orderMode;
        }
        if (this.page != undefined) {
            query["page"] = this.page;
        }
        if (this.size != undefined) {
            query["size"] = String(this.size);
        }
        if (this.id != undefined) {
            query["id"] = this.id;
        }
        if (this.ids != undefined) {
            query["ids"] = this.ids;
        }
        let params = new URLSearchParams();
        params.set('query', JSON.stringify(query));
        return params;
    }
    keywordFilter(keyword: string){
        return keyword.replace(/[^\w\s]+/gi, '*');
    }
}

@Injectable()
export class ContactListService {
    private changes: BehaviorSubject<boolean>;
    
    constructor(public backendService: BackendService) {
        this.changes = new BehaviorSubject<boolean>(true);
    }
    subscribe(observerOrNext?: any | ((value) => void), error?: (error: any) => void, complete?: () => void) {
        this.changes.delay(500).subscribe(observerOrNext, error, complete);
    }
    getStatistic() {
        return this.backendService
            .get('/app/lists/statistic/', null);
    }
    addList(contactList: ContactList) {
        let commandData = new CommandData();
        commandData.item = contactList;
        return this.backendService
            .post('/app/lists/', commandData).map(res => {
                this.changes.next(true);
                return res;
            });
    }
    starList(id: string, stared: boolean) {
        let params = new URLSearchParams();
        params.set("id", id);
        params.set("stared", String(stared));
        return this.backendService
            .put('/app/lists/star/', {}, params);
    }
    updateList(contactList: ContactList) {
        console.log('contactList', contactList)
        let commandData = new CommandData();
        commandData.item = contactList;
        return this.backendService
            .put('/app/lists/', commandData).map(res => {
                this.changes.next(true);
                return res;
            });
    }
    importList(newContactList: ContactList, listIds: string[], stared: boolean, csvFileName: string, csvFileUrl: string, csvIndicator: Object) {
        let commandData = new CommandData();
        commandData.item = newContactList;
        commandData.items = listIds;
        commandData.csvData = {
            fileName: csvFileName,
            fileUrl: csvFileUrl,
            indicator: csvIndicator
        };
        let params = new URLSearchParams();
        params.set("stared", String(stared));
        return this.backendService
            .post('/app/lists/import/', commandData).map(res => {
                this.changes.next(true);
                return res;
            });
    }
    searchList(query: SearchListQuery) {
        return this.backendService
            .get('/app/lists/', query.getQueryParameters());
    }
    deleteList(listIds: string[], deleteContacts: boolean, all: boolean) {
        let params = new URLSearchParams();
        params.set('ids', JSON.stringify(listIds));
        params.set('deleteContacts', String(deleteContacts));
        params.set('all', String(all));
        return this.backendService.delete('/app/lists/', params).map(res => {
            this.changes.next(true);
            return res;
        });
    }
}