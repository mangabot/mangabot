import {Base} from './base';
import { SiteEnum } from './site.enum';
import { Chapter } from './chapter';
import { Guid } from '../application';

export class Manga implements Base {
    id: string;
    name: string;
    site: SiteEnum;
    url: string;
    thumbnail;
    children: Array<Chapter>;

    constructor(name: string, site: SiteEnum, url: string) {
        this.id = Guid.newGuid();
        this.name = name;
        this.site = site;
        this.url = url;
        this.thumbnail = "http://1.bp.blogspot.com/-cCrB8aFGEUA/V-5YvYEy9mI/AAAAAAAR9Qg/8w5uxiC3j5Y/s86-c/tieu-ma-than-zenki.jpg";
        this.children = new Array();
    }
    
}
