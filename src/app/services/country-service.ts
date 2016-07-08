import {Injectable} from 'angular2/core';
import {BackendService} from './backend-service';

export class PhoneInfo {
    public code: string;
    public label: string;
    public number: string;
    public countryId: string;
    public country: string;
    public id: string;
}

@Injectable()
export class CountryService {
    private country2CodeMap: Object;
    private countries: {id: string, name: string, code: string}[];
    constructor(backendService: BackendService) {
        let url = backendService.getAppUrl('assets/data/countries.json');
        backendService.get(url)
            .map(res => res.json())
            .subscribe(countryMap => {
                this.country2CodeMap = countryMap;
                let countries = [];
                for (var key in countryMap) {
                    if (countryMap.hasOwnProperty(key)) {
                        let code = countryMap[key].code.replace(/\s/g, '');
                        if (code.length > 0) {
                            countries.push({
                                id: key.toLowerCase(),
                                name: countryMap[key].name,
                                code: code
                            });
                        }
                    }
                }
                this.countries = countries;
            });
    }
    getPhoneInfo(phone: {id: string, phoneNumber: string, label: string}) {
        let phoneNumber = phone.phoneNumber;
        for (let i = 0; i < this.countries.length; ++i) {
            var country = this.countries[i];
            if (phoneNumber.indexOf('+' + country.code) == 0) {
                let phoneInfo = new PhoneInfo();
                phoneInfo.code = country.code;
                phoneInfo.number = phoneNumber.replace('+' + country.code, '');
                phoneInfo.countryId = country.id;
                phoneInfo.country = country.name;
                phoneInfo.label = phone.label;
                phoneInfo.id = phone.id;
                return phoneInfo;
            }
        }
        let phoneInfo = new PhoneInfo();
        phoneInfo.number = phoneNumber;
        phoneInfo.label = phone.label;
        return phoneInfo;
    }
    getCountries() {
        return this.countries;
    }
    getMap() {
        return this.country2CodeMap;
    }
}
