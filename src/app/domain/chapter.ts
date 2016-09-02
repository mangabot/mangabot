import {Base} from './base';
import { SiteEnum } from './site.enum';
import { Manga } from './manga';
import { Page } from './page';

export class Chapter implements Base {
    id: string;
    name: string;
    site: SiteEnum;
    url: string;
    parent: Manga;
    children: Array<Page>;
}
