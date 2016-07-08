import {Injectable, Inject} from 'angular2/core';
// import {URLSearchParams} from 'angular2/http';
import {CustomURLSearchParams as URLSearchParams} from '../utils/custom-url-search-params';
import {BehaviorSubject} from 'rxjs/subject/BehaviorSubject';

import {BackendService, CommandData} from '../services/backend-service';
import {User} from '../models/user';
import {Contact} from '../models/contact';

export const SearchOrder = {
    DESC: 'DESC',
    ASC: 'ASC'
};

export class SearchContactQuery {
    constructor(
        public keyword?: string,
        public page?: number,
        public size: number = 8,
        public orderField?: string,
        public orderMode?: string,
        public listId?: string,
        public id?: string,
        public ids?: string[]     
    ) {}
    
    getQueryParameters() {
        let query = {};
        if (this.keyword != undefined) {
            query["keyword"] = this.keywordFilter(this.keyword);
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
        if (this.listId != undefined) {
            query["listId"] = this.listId;
        }
        if (this.id != undefined) {
            query["id"] = this.id;
        }
        if (this.ids != undefined) {
            query["ids"] = JSON.stringify(this.ids);
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
export class ContactService {
    private changes: BehaviorSubject<boolean>;
    constructor(public backendService: BackendService) {
        this.changes = new BehaviorSubject<boolean>(true);
    }
    subscribe(observerOrNext?: any | ((value) => void), error?: (error: any) => void, complete?: () => void) {
        this.changes.delay(1000).subscribe(observerOrNext, error, complete);
    }
    getStatistic() {
        return this.backendService
            .get('/app/contacts/statistic/', null);
    }
    searchContact(query: SearchContactQuery) {
        return this.backendService
            .get('/app/contacts/', query.getQueryParameters());
    }
    deleteContact(ids: string[], listId: string, all: boolean) {
        let params = new URLSearchParams();
        params.set('ids', JSON.stringify(ids));
        params.set('all', String(all));
        if (listId) {
            if (listId == 'all') {
                listId = "0";
            }
            params.set('listId', listId);
        }
        return this.backendService.delete('/app/contacts/', params).map(res => {
            this.changes.next(true);
            return res;
        });
    }
    addContact(contact: Contact) {
        let commandData = new CommandData();
        commandData.item = contact;
        return this.backendService
            .post('/app/contacts/', commandData).map(res => {
                this.changes.next(true);
                return res;
            });
    }
    updateContact(contact: Contact) {
        let commandData = new CommandData();
        commandData.item = contact;
        return this.backendService
            .put('/app/contacts/', commandData).map(res => {
                this.changes.next(true);
                return res;
            });
    }
    save(contact: Contact) {
        if (contact.id) {
            return this.updateContact(contact);
        }
        return this.addContact(contact);
    }
    removeContact(ids: string[], listId: string, all: boolean) {
        let params = new URLSearchParams();
        params.set('ids', JSON.stringify(ids));
        params.set('all', String(all));
        return this.backendService.delete('/app/contacts/' + listId + '/', params).map(res => {
            this.changes.next(true);
            return res;
        });
    }
    starContact(id: string, listId:string, stared: boolean) {
        let params = new URLSearchParams();
        params.set("id", id);
        params.set("listId", listId);
        params.set("stared", String(stared));
        return this.backendService
            .put('/app/contacts/star/', {}, params);
    }
    merge(deletingIds: string[], savingContacts: {}[]) {
        return this.backendService
            .put('/app/contacts/merge/', {deletingIds: deletingIds, savingContacts: savingContacts})
            .delay(1000)
            .map(res => {
                this.changes.next(true);
                return res;
            });
    }
}