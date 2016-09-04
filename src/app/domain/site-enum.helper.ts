import { SiteEnum } from './site.enum';

export class SiteEnumHelper {

    static getStringValue(site: SiteEnum): string {
        return SiteEnum[site].toLowerCase();
    }
}