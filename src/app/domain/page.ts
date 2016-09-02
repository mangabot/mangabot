import { Base } from './base';
import { SiteEnum } from './site.enum';
import { Manga } from './manga';
import { Chapter } from './chapter';

export class Page implements Base {
    id: string;
    name: string;
    site: SiteEnum;
    url: string;
    parent: Chapter;
}
