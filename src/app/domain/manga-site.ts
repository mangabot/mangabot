import { SiteEnum } from './site.enum';

export class MangaSite {

    constructor(
        public site: SiteEnum,
        public name: string,
        public domain: string,
        public mangaListUrl: string,
        public logoUrl?: string) {
    }

    match(url: string): boolean {
        return url != null && url.indexOf(this.domain) !== -1;
    }
}