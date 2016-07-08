import {Activity} from './activity';
import {User} from './user';
import {DuplicationCase} from './duplication-case';

declare var _: any;

// export class Star {
//     constructor(public user: User, public listId: string) {}
// }

export class Contact {
    public duplicateIds: string[] = [];
    
    constructor(
        public title: string = 'Mr.',
        public name: string = '',
        public firstName: string = '',
        public lastName: string = '',
        public defaultEmailAddress?: string,
        public emails?: {id: string, label: string, emailAddress:string}[],
        public defaultPhoneNumber?: string,
        public phones?: {id: string, label: string, phoneNumber:string}[],
        public jobTitle: string = '',
        public company: string = '',
        public streetAddress: string = '',
        public state: string = '',
        public city: string = '',
        public duplicateInfo?: {
            nameCases: string[], 
            emailCases: {},
            phoneCases: {}
        },
        public createdAt?: Date,
        public updatedAt?: Date,
        public stared?: Boolean,
        public lastActivity?: Activity,
        public id?: string,
        public listIds?: string[]
    ) {
        let ids:string[] = [];
        if (this.duplicateInfo) {
            let nameCases = this.duplicateInfo.nameCases;
            if (nameCases) {
                ids = ids.concat(nameCases);
            }
            let emailCases = this.duplicateInfo.emailCases;
            if (emailCases) {
                for (let key in emailCases) {
                    ids = ids.concat(emailCases[key]);
                }
            }
            let phoneCases = this.duplicateInfo.phoneCases;
            if (phoneCases) {
                for (let key in phoneCases) {
                    ids = ids.concat(phoneCases[key]);
                }
            }
        }
        this.duplicateIds = _.uniq(ids);
    }
    
    getDuplicateCases() {
        let duplicationCases:DuplicationCase[] = [];
        if (this.duplicateInfo) {
            let nameCases = this.duplicateInfo.nameCases;
            if (nameCases) {
                nameCases = [this.id].concat(nameCases);
                let nameCase = new DuplicationCase('name', this.name, nameCases);
                duplicationCases.push(nameCase);
            }
            let emailCases = this.duplicateInfo.emailCases;
            for (let key in emailCases) {
                let ids: string[];
                let emailCase = new DuplicationCase('email', key, [this.id].concat(emailCases[key]));
                duplicationCases.push(emailCase);
            }
            let phoneCases = this.duplicateInfo.phoneCases;
            for (let key in phoneCases) {
                let ids: string[];
                let phoneCase = new DuplicationCase('phone', key, [this.id].concat(phoneCases[key]));
                duplicationCases.push(phoneCase);
            }
        }
        return duplicationCases;
    }
    
    // isStared(user: User, listId: string) {
    //     if (this.stars && user) {
    //         for (let i = 0; i < this.stars.length; ++i) {
    //             let star = this.stars[i];
    //             if (star.user.uuid == user.uuid && 
    //                     star.user.initiatorUid == user.initiatorUid &&
    //                     star.listId == listId) {
    //                 return true;
    //             }
    //         }
    //     }
    //     return false;
    // }
}
