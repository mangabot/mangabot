import { SiteEnum } from './site.enum';

export interface Base {
    id: string;
    name: string;
    site: SiteEnum;
    url: string;
    parent?: Base;
    children?: Array<Base>;
}
