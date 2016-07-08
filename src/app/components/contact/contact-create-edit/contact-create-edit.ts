import {Component, Input} from 'angular2/core';
import {Control} from 'angular2/common';
import {Response} from 'angular2/http';
import {ROUTER_DIRECTIVES} from 'angular2/router';

declare var jQuery: any;
import {Contact} from '../../../models/contact';
import {ContactList} from '../../../models/contact-list';
import {User} from '../../../models/user';
import {SideBarService} from '../../../services/sidebar-service';
import {CountryService, PhoneInfo} from '../../../services/country-service';
import {UserService} from '../../../services/user-service';
import {ContactListService, SearchListQuery} from '../../../services/contact-list-service';
import {ContactService} from '../../../services/contact-service';

@Component({
    selector: 'contact-create-edit',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/components/contact/contact-create-edit/contact-create-edit.html',
    styleUrls: ['app/components/contact/contact-create-edit/contact-create-edit.css']
})
export class ContactCreateEdit {
    private countries: {id: string, name: string, code: string}[] = [];
    
    private phoneInfos: PhoneInfo[];
    private updatedPhoneInfos: PhoneInfo[];
    private defaultPhoneIndex = 0;
    private user: User;
    
    private emailInfos: {emailAddress: string, label: string}[];
    private updatedEmailInfos: {id: string, emailAddress: string, label: string}[];
    private defaultEmailIndex = 0;
    
    private originalDetail: {listId: string, contact:Contact, from: string};
    private detail: {listId: string, contact:Contact, from: string};
    private lists: {id:string, name: string}[] = [];
    private listName = new Control('');
    private suggestItems: ContactList[] = [];
    
    constructor(
        private contactListService: ContactListService, 
        private contactService: ContactService,
        private countryService: CountryService, 
        private userService: UserService,
        private sidebar: SideBarService) {
    }
    show(detail: {listId: string, contact: Contact, from: string}) {
        this.countries = this.countryService.getCountries();
        this.user = this.userService.getCurrentUser();
        this.detail = detail;
        this.originalDetail = detail;
        this.phoneInfos = [];
        this.updatedPhoneInfos = [];
        this.emailInfos = [];
        this.updatedEmailInfos = [];
        this.defaultPhoneIndex = 0;
        this.lists = [];
        if (detail) {
            this.detail = JSON.parse(JSON.stringify(detail));
            if (detail.contact) {
                let phones = detail.contact.phones;
                if (phones) {
                    this.phoneInfos = this.getPhoneInfos(phones);
                    this.updatedPhoneInfos = JSON.parse(JSON.stringify(this.phoneInfos));
                    for (let i = 0; i < phones.length; ++i) {
                        if (phones[i].phoneNumber == detail.contact.defaultPhoneNumber) {
                            this.defaultPhoneIndex = i;
                            break;
                        }
                    }
                }
                let emails = detail.contact.emails;
                if (emails) {
                    this.emailInfos = JSON.parse(JSON.stringify(emails));
                    this.updatedEmailInfos = JSON.parse(JSON.stringify(emails));
                    for (let i = 0; i < emails.length; ++i) {
                        if (emails[i].emailAddress == detail.contact.defaultEmailAddress) {
                            this.defaultEmailIndex = i;
                            break;
                        }
                    }
                }
                let listIds = detail.contact.listIds;
                if (listIds && listIds.length > 0) {
                    let query = new SearchListQuery();
                    query.ids = listIds;
                    query.size = listIds.length;
                    this.contactListService.searchList(query)
                        .map(res => res.json())
                        .subscribe(res => {
                            this.lists = res.content;
                            this.attachListSuggestor();
                        });
                } else {
                    this.attachListSuggestor();
                }
            }
        }
        let self = this;
        setTimeout(function() {
            self.attachPhoneSelectorAction();
            self.attachEmailSelectorAction();
            jQuery('.contact-create-edit .ui.checkbox').checkbox();
            if (detail && detail.contact && detail.contact.title) {
                let title = detail.contact.title.toLowerCase().replace('.', '');
                jQuery('.contact-create-edit .ui.checkbox.' + title).checkbox('set checked');
            }
        }, 500);
    }
    addList(list) {
        list.name = list.name.trim();
        if (!list.id) {
            this.contactListService.addList(new ContactList(list.name))
                .map(res => res.json())
                .subscribe(res => {
                   list.id = res.id;
                });
        }
        this.lists.push(list);
        let listMap = {};
        this.lists.forEach(l => {
            if (!listMap[l.name] || listMap[l.name].id) {
                listMap[l.name] = l;
            }
        });
        let items = [];
        for (var key in listMap) {
            if (listMap.hasOwnProperty(key)) {
                items.push(listMap[key]);
            }
        }
        this.lists = items;
        this.suggestItems = this.suggestItems.filter(item => {
            return this.lists.filter(list => list.id == item.id).length == 0;
        });
        this.listName.updateValue('');
    }
    hasName(name: string) {
        return this.lists.filter(l => l.name == name.trim()).length > 0;
    }
    existingName(name: string) {
        return this.suggestItems.filter(l => l.name == name.trim()).length > 0;
    }
    getSelectorPopup(text) {
        return '<div style="font-weight:400;width:75px;">default ' + text + '</div>';
    }
    attachListSuggestor() {
        this.listName = new Control('dummy');
        setTimeout(function() {
            jQuery('.contact-create-edit .suggestor.input').popup({
                popup : jQuery('.contact-create-edit .suggestor.popup'),
                on    : 'click'
            });
        }, 500);
        this.listName.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .switchMap(term => {
                let keyword = '*' + String(term).trim() + '*';
                let query = new SearchListQuery(String(keyword), 0, 10);
                return this.contactListService.searchList(query);
            })
            .map(res => (<Response>res).json())
            .subscribe(res => {
                let items: {name: string, id: string, stars: User[]}[] = res.content;
                this.suggestItems = items.filter(item => {
                    return this.lists.filter(list => list.id == item.id).length == 0;
                }).map(item => {
                    let contactList = new ContactList();
                    contactList.id = item.id;
                    contactList.name = item.name;
                    // contactList.stared = item.stars;
                    return contactList;
                });
            });
         this.listName.updateValue('');
    }
    attachPhoneSelectorAction() {
        let self = this;
        jQuery('.contact-create-edit .ui.dropdown.phone').dropdown({
            onChange: function(value, text, $choice) {
                let ids = value.split('-');
                let countryMap = self.countryService.getMap();
                let country = countryMap[ids[1].toUpperCase()];
                self.updatedPhoneInfos[ids[0]].code = country.code.replace(/\s/g, '');
                self.updatedPhoneInfos[ids[0]].countryId = country.iso2.toLowerCase();
                self.updatedPhoneInfos[ids[0]].country = country.name;
            }
        });
        jQuery('.contact-create-edit .ui.dropdown.phone-label').dropdown({
            onChange: function(value, text, $choice) {
                let ids = value.split('-');
                self.updatedPhoneInfos[ids[0]].label = ids[1];
            }
        });
        jQuery('.default-phone').popup({inline: true, on: 'hover', position: 'top center'});
    }
    attachEmailSelectorAction() {
        let self = this;
        jQuery('.contact-create-edit .ui.dropdown.email-label').dropdown({
            onChange: function(value, text, $choice) {
                let ids = value.split('-');
                self.updatedEmailInfos[ids[0]].label = ids[1];
            }
        });
        jQuery('.default-email').popup({inline: true, on: 'hover', position: 'top center'});
    }
    getPhoneInfos(phones) {
        return phones.map(phone => this.countryService.getPhoneInfo(phone));
    }
    removeList(index: number) {
        this.lists.splice(index, 1);
    }
    canSave() {
        let updatedEmailInfos = this.updatedEmailInfos;
        for (let i = 0; i < updatedEmailInfos.length; ++i) {
            if (!this.isValidEmail(updatedEmailInfos[i].emailAddress)) {
                return false;
            }
        }
        let updatedPhoneInfos = this.updatedPhoneInfos;
        for (let i = 0; i < updatedPhoneInfos.length; ++i) {
            if (!this.isValidNumber(updatedPhoneInfos[i].number)) {
                return false;
            }
        }
        let contact = this.detail.contact;
        if (contact.firstName.trim().length > 0) {
            return true;
        }
        if (contact.lastName.trim().length > 0) {
            return true;
        }
        if (updatedEmailInfos.length > 0) {
            return true;
        }
        if (updatedPhoneInfos.length > 0) {
            return true;
        }
        return false;
    }
    save() {
        if (this.canSave()) {
            let contact = this.detail.contact;
            if (jQuery('.contact-create-edit .ui.checkbox.mr input:checked').length > 0) {
                contact.title = 'Mr.';
            } else if (jQuery('.contact-create-edit .ui.checkbox.ms input:checked').length > 0) {
                contact.title = 'Ms.';
            } else {
                contact.title = 'Mrs.';
            }
            contact.name = contact.firstName + ' ' + contact.lastName;
            contact.name = contact.name.trim();
            contact.emails = this.updatedEmailInfos;
            contact.defaultEmailAddress = null;
            if (contact.emails.length > 0) {
                contact.defaultEmailAddress = contact.emails[this.defaultEmailIndex].emailAddress;
            }
            contact.phones = this.updatedPhoneInfos.map(info =>  {
                return {
                    id: info.id,
                    label: info.label,
                    phoneNumber: '+' + info.code + info.number
                };
            });
            contact.defaultPhoneNumber = null;
            if (contact.phones.length > 0) {
                contact.defaultPhoneNumber = contact.phones[this.defaultPhoneIndex].phoneNumber;
            }
            contact.listIds = this.lists.filter(l => l.id != undefined).map(l => l.id);
            let subject = this.contactService
                .save(contact)
                .map(res => res.json());
            let detail = this.detail;
            if (contact.id) {
                this.sidebar.next({
                    id: 'show-contact',
                    name: 'show',
                    data: detail
                });
            } else {
                this.close();
            }
            
            subject.subscribe(res => {
                if (!contact.id) {
                    contact.id = res.id;
                    detail.contact = contact;
                    this.sidebar.next({
                        id: 'show-contact',
                        name: 'show',
                        data: detail
                    });
                }
            });
        }
    }
    addNewNumber() {
        if (this.updatedPhoneInfos.length > 0) {
            let newPhoneInfo = this.updatedPhoneInfos[this.updatedPhoneInfos.length - 1];
            newPhoneInfo = JSON.parse(JSON.stringify(newPhoneInfo));
            newPhoneInfo.number = '';
            newPhoneInfo.id = null;
            this.updatedPhoneInfos.push(newPhoneInfo);
        } else {
            let newPhoneInfo = new PhoneInfo();
            let user = this.user;
            let country = this.countryService.getMap()[user.country.toUpperCase()];
            newPhoneInfo.code = country.code;
            newPhoneInfo.countryId = country.iso2.toLowerCase();
            newPhoneInfo.country = country.name;
            newPhoneInfo.number = '';
            newPhoneInfo.label = 'WORK';
            this.updatedPhoneInfos.push(newPhoneInfo);
        }
        this.phoneInfos = JSON.parse(JSON.stringify(this.updatedPhoneInfos));
        let self = this;
        setTimeout(function() {
            self.attachPhoneSelectorAction();
        }, 500);
    }
    removePhoneNumber(index: number) {
        if (index == this.defaultPhoneIndex) {
            this.defaultPhoneIndex = 0;
        }
        this.updatedPhoneInfos.splice(index, 1);
        this.phoneInfos = JSON.parse(JSON.stringify(this.updatedPhoneInfos));
    }
    selectDefaultPhoneNumber(index: number) {
        let self = this;
        this.defaultPhoneIndex = index;
        this.phoneInfos = JSON.parse(JSON.stringify(this.updatedPhoneInfos));
        setTimeout(function() {
            self.attachPhoneSelectorAction();
        }, 500);
    }
    isValidNumber(number: string) {
        return /[0-9]{3,12}/.test(number);
    }
    selectDefaultEmailAddress(index: number) {
        let self = this;
        this.defaultEmailIndex = index;
        this.emailInfos = JSON.parse(JSON.stringify(this.updatedEmailInfos));
        setTimeout(function() {
            self.attachEmailSelectorAction();
        }, 500);
    }
    addNewEmail() {
        let email;
        if (this.updatedEmailInfos.length > 0) {
            email = this.updatedEmailInfos[this.updatedEmailInfos.length - 1];
            email = JSON.parse(JSON.stringify(email));
            email.id = undefined;
            email.emailAddress = '';
        } else {
            email = {id: undefined, emailAddress: '', label: 'WORK'};
        }
        
        this.updatedEmailInfos.push(email);
        this.emailInfos = JSON.parse(JSON.stringify(this.updatedEmailInfos));
        let self = this;
        setTimeout(function() {
            self.attachEmailSelectorAction();
        }, 500);
    }
    removeEmailAddress(index: number) {
        if (index == this.defaultEmailIndex) {
            this.defaultEmailIndex = 0;
        }
        this.updatedEmailInfos.splice(index, 1);
        this.emailInfos = JSON.parse(JSON.stringify(this.updatedEmailInfos));
    }
    isValidEmail(email: string) {
        return /\S+@\S+\.\S+/.test(email);
    }
    hide() {
        this.updatedPhoneInfos = [];
        this.phoneInfos = [];
        this.originalDetail = null;
        this.detail = null;
    }
    discard() {
        if (this.originalDetail.contact.id && this.originalDetail.from != 'edit') {
            this.sidebar.next({
                id: 'show-contact',
                name: 'show',
                data: this.originalDetail
            });
        } else {
            this.close();
        }
    }
    viewList(listId: string) {
        this.detail.listId = listId;
    }
    close() {
        this.sidebar.next({
            name: 'hide',
            data: this.originalDetail
        });
        this.hide();
    }
}
