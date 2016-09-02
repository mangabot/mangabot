import { SiteEnum } from './site.enum';

export class MangaSite {

    constructor(
        protected site: SiteEnum,
        protected name: string,
        protected domain: string,
        protected mangaListUrl: string,
        protected logoUrl?: string) {

        console.log(this.site + '-' + name);
    }

    match(url: string): boolean {
        return url != null && url.indexOf(this.domain) !== -1;
    }
}