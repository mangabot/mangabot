import { Base, Manga, Chapter, SiteEnum } from './';
import { Guid } from '../application';

export class Page implements Base {
    id: string;
    name: string;
    site: SiteEnum;
    url: string;
    parent: Chapter;

    constructor() {
        this.id = Guid.newGuid().replace(/-/gi, '');
    }
}
