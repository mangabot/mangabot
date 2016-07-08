declare var _:any;

export class DuplicationCase {
    private notDuplicationIndexs: number[] = [];
    constructor(public type: string, public title: string, public ids: string[], public mainIndex = 0) {
    }
    getDuplicateContacts(contactMap: {}) {
        let contacts = [];
        for (let i = 0; i < this.ids.length; ++i) {
            if (this.notDuplicationIndexs.indexOf(i) == -1) {
                contacts.push(contactMap[this.ids[i]]);
            }
        }
        return contacts;
    }
    merge(contactMap: {}) {
        if (this.mainIndex >= 0) {
            let mainId = this.ids[this.mainIndex];
            let mainContact = contactMap[mainId];
            let duplicateContacts = this.getDuplicateContacts(contactMap);
            duplicateContacts.forEach(contact => {
                if (contact.emails) {
                    if (mainContact.emails) {
                        mainContact.emails = mainContact.emails.concat(contact.emails);
                        mainContact.emails = _.uniq(mainContact.emails, function(email) {
                            return email.emailAddress;
                        });
                    } else {
                        mainContact.emails = contact.emails;
                        mainContact.defaultEmailAddress = mainContact.emails[0].emailAddress;
                    }
                }
                if (contact.phones) {
                    if (mainContact.phones) {
                        mainContact.phones = mainContact.phones.concat(contact.phones);
                        mainContact.phones = _.uniq(mainContact.phones, function(phone) {
                            return phone.phoneNumber;
                        });
                    } else {
                        mainContact.phones = contact.phones;
                        if (mainContact.phones.length > 0) {
                            mainContact.defaultPhoneNumber = mainContact.phones[0].phoneNumber;
                        }
                    }
                }
                if (contact.listIds) {
                    if (mainContact.listIds) {
                        mainContact.listIds = mainContact.listIds.concat(contact.listIds);
                        mainContact.listIds = _.unique(mainContact.listIds);
                    } else {
                        mainContact.listIds = contact.listIds;
                    }
                }
                if (contact.stars) {
                    if (mainContact.stars) {
                        mainContact.stars = mainContact.stars.concat(contact.stars);
                        mainContact.stars = _.uniq(mainContact.stars, function(star) {
                            return star.listId + '|' + star.user.uuid + '|' + star.user.initiatorUid;
                        });
                    } else {
                        mainContact.stars = contact.stars;
                    }
                }
                contactMap[contact.id] = mainContact;
            });
        }
        
    }
    getDuplicationType(index: number) {
        if (this.mainIndex == index) {
            return 'Main Contact';
        } else if (this.notDuplicationIndexs.indexOf(index) >= 0) {
            return 'Not a Duplication';
        }
        return 'Duplicate Contact';
    }
    markAsMain(index: number) {
        this.mainIndex = index;
        let ndi = this.notDuplicationIndexs.indexOf(index);
        if (ndi >= 0) {
            this.notDuplicationIndexs.splice(ndi, 1);
        }
    }
    markAsNotAduplicate(index: number) {
        this.notDuplicationIndexs.push(index);
        if (this.mainIndex == index) {
            this.mainIndex = -1;
            for(let i = 0; i < this.ids.length; ++i) {
                if (this.notDuplicationIndexs.indexOf(i) == -1) {
                    this.mainIndex = i;
                    break;
                }
            }
        }
    }
    markAsDuplicate(index: number) {
        if (index == this.mainIndex) {
            for(let i = 0; i < this.ids.length; ++i) {
                if (index != i && this.notDuplicationIndexs.indexOf(i) == -1) {
                    this.mainIndex = i;
                    break;
                }
            }
        } else {
            let ndi = this.notDuplicationIndexs.indexOf(index);
            if (ndi >= 0) {
                this.notDuplicationIndexs.splice(ndi, 1);
            }
        }
    }
}