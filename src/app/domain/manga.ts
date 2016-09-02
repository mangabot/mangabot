import {Base} from './base';
import { SiteEnum } from './site.enum';
import { Chapter } from './chapter';

export class Manga implements Base {
    id: string;
    name: string;
    site: SiteEnum;
    url: string;
    children: Array<Chapter>;
}
