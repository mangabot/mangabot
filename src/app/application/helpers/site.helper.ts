import { SiteEnum } from '../../domain';

export class SiteHelper {

    static fromUrl(url: string): SiteEnum {
        // TODO implement it
        return SiteEnum.BLOGTRUYEN;
    }

    static parseString(site: string): SiteEnum {
        return SiteEnum[site];
    }

    static isInWhitelist(url: string): boolean {
        return this.fromUrl(url) !== SiteEnum.UNKNOWN;
    }
}