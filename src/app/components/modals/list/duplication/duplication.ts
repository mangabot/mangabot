import {Component, Output, EventEmitter} from 'angular2/core';
import {Contact} from '../../../../models/contact';
import {DuplicationCase} from '../../../../models/duplication-case';
import {ContactList} from '../../../../models/contact-list';
import {ContactService, SearchContactQuery} from '../../../../services/contact-service';
import {Action, ActionStream} from '../../../../streams/action-stream';
declare var jQuery: any;

@Component({
    selector: 'lm-duplication',
    templateUrl: 'app/components/modals/list/duplication/duplication.html',
    styleUrls: ['app/components/modals/list/duplication/duplication.css']
})
export class LmDuplication {
    private id = "#lm-duplication";
    private loading = false;
    private contactMap = {};
    private duplication = {
        total: 0,
        cases: [] as DuplicationCase[]
    };
    
    constructor(private contactService: ContactService, actionStream: ActionStream) {
        actionStream.getStream()
            .filter(action => action.id == 'show-list-duplication')
            .subscribe(action => {
                this.show(action.data);
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
            }
        });
    }
    
    getMoreEmailInfo(id: string, duplicate: DuplicationCase) {
        let info = '';
        let contact = this.contactMap[id];
        let shownEmail = contact.defaultEmailAddress;
        if (duplicate.type == 'email') {
            shownEmail = duplicate.title;
        }
        (contact.emails as {emailAddress: string}[]).forEach(email => {
            if (email.emailAddress != shownEmail) {
                if (info != '') {
                    info += '<br/>';
                }
                info += email.emailAddress; 
            }
        });
        return info;
    }
    getMorePhoneInfo(id: string, duplicate: DuplicationCase) {
        let info = '';
        let contact = this.contactMap[id];
        let shownNumber = contact.defaultPhoneNumber;
        if (duplicate.type == 'phone') {
            shownNumber = duplicate.title;
        }
        (contact.phones as {phoneNumber: string}[]).forEach(phone => {
            if (phone.phoneNumber != shownNumber) {
                if (info != '') {
                    info += '<br/>';
                }
                info += phone.phoneNumber; 
            }
        });
        return info;
    }
    getMoreInfo(id: string) {
        let info = '';
        let contact = this.contactMap[id];
        if (contact.firstName && contact.firstName.length > 0) {
            info += contact.firstName + ' ';
        }
        if (contact.lastName && contact.lastName.length > 0) {
            info += contact.lastName;
        }
        if (info != '') {
            if (contact.title) {
                info = contact.title + ' ' + info;
            }
            info = '<b>' + info + '</b><br/>';
        }
        if (contact.jobTitle && contact.jobTitle.length > 0) {
            info += contact.jobTitle + ' ';
        }
        if (contact.company && contact.company.length > 0) {
            info += '@' + contact.company;
        }
        if (info != '') {
            info = '<div style="font-weight:300">' + info + '</div>';
        }
        return info;
    }
    attachUiPlugins() {
        jQuery(this.id + ' .more').popup({
            inline: true,
            on: 'hover'
        });
        jQuery(this.id + ' .ui.dropdown.action').dropdown({
            action: 'hide'
        });
    }
    markAllAsNotADuplicate() {
        let savingContacts = [];
        let deletingContacts = [];
        for (let key in this.contactMap) {
            let contact = this.contactMap[key];
            contact.duplicateInfo = null;
            savingContacts.push(contact);
        }
        this.contactService
            .merge(deletingContacts, savingContacts)
            .subscribe(res => {});
    }
    merge() {
        let cases = this.duplication.cases;
        cases.forEach(duplicateCase => {
            duplicateCase.merge(this.contactMap);
        });
        let savingContacts = [];
        let deletingContacts = [];
        for (let key in this.contactMap) {
            let contact = this.contactMap[key];
            if (key != this.contactMap[key].id) {
                deletingContacts.push(key);
            } else {
                contact.duplicateInfo = null;
                savingContacts.push(contact);
            }
        }
        this.contactService
            .merge(deletingContacts, savingContacts)
            .subscribe(res => {});
        this.hide();
    }
    show(list: ContactList) {
        this.loading = true;
        this.contactMap = {};
        this.duplication.total = list.numberOfDuplications;
        this.duplication.cases = list.getDuplicateCases();
        jQuery(this.id).modal('show');
        let ids = list.getDuplicationIds();
        let query = new SearchContactQuery();
        query.page = 0;
        query.size = ids.length;
        query.ids = ids;
        this.contactService
            .searchContact(query)
            .map(res => res.json())
            .subscribe(res => {
                let items = res.content as [];
                items.forEach(item => {
                    this.contactMap[item['id']] = item;
                });
                this.loading = false;
                var self = this;
                setTimeout(function() {
                   self.attachUiPlugins();
                }, 500);
            });
    }
    hide() {
        this.loading = true;
        this.contactMap = {};
        this.duplication.cases = [];
        this.duplication.total = 0;
        jQuery(this.id).modal('hide');
    }
}
