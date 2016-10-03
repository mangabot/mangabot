import { Base, Manga, Page, SiteEnum } from './';
import { Guid } from '../application';

export class Chapter implements Base {
    id: string;
    name: string;
    site: SiteEnum;
    url: string;
    parent: Manga;
    children: Array<Page>;

    constructor() {
        this.id = Guid.newGuid().replace(/-/gi, '');
    }
}
