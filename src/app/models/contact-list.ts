import {Activity} from './activity';
import {User} from './user';
import {Contact} from './contact';
import {DuplicationCase} from './duplication-case';

declare var _: any;

export class ContactList {
    constructor(
        public name?: string,
        public numberOfContacts?: number,
        public numberOfEmails?: number,
        public numberOfPhones?: number,
        public numberOfDuplications?: number,
        public updatedAt?: Date,
        public stared?: Boolean,
        public lastActivity?: Activity,
        public id?: string,
        public duplicateNameCases?: Object,
        public duplicateEmailCases?: Object,
        public duplicatePhoneCases?: Object
    ) {}
    
    getDuplicationIds() {
        let ids:string[] = [];
        if (this.numberOfDuplications > 0) {
            let nameCases = this.duplicateNameCases;
            for (let key in nameCases) {
                ids = ids.concat(nameCases[key]);
            }
            let emailCases = this.duplicateEmailCases;
            for (let key in emailCases) {
                ids = ids.concat(emailCases[key]);
            }
            let phoneCases = this.duplicatePhoneCases;
            for (let key in phoneCases) {
                ids = ids.concat(phoneCases[key]);
            }
        }
        return _.uniq(ids);
    }
    
    getDuplicateCases() {
        let duplicationCases:DuplicationCase[] = [];
        if (this.numberOfDuplications > 0) {
            let nameCases = this.duplicateNameCases;
            for (let key in nameCases) {
                let ids: string[];
                let nameCase = new DuplicationCase('name', key, nameCases[key]);
                duplicationCases.push(nameCase);
            }
            let emailCases = this.duplicateEmailCases;
            for (let key in emailCases) {
                let ids: string[];
                let emailCase = new DuplicationCase('email', key, emailCases[key]);
                duplicationCases.push(emailCase);
            }
            let phoneCases = this.duplicatePhoneCases;
            for (let key in phoneCases) {
                let ids: string[];
                let phoneCase = new DuplicationCase('phone', key, phoneCases[key]);
                duplicationCases.push(phoneCase);
            }
        }
        return duplicationCases;
    }
    
    // isStared(user: User) {
    //     if (this.stars && user) {
    //         for (let i = 0; i < this.stars.length; ++i) {
    //             let actedUser = this.stars[i];
    //             if (actedUser.uuid == user.uuid && actedUser.initiatorUid == user.initiatorUid) {
    //                 return true;
    //             }
    //         }
    //     }
    //     return false;
    // }
}
