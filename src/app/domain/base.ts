import { SiteEnum } from './';

export interface Base {
    id: string;
    name: string;
    site: SiteEnum;
    url: string;
    parent?: Base;
    children?: Array<Base>;
}
