import { Site } from './site.enum';

export interface Base {
    id: string;
    name: string;
    site: Site;
    url: string;
    parent?: Base;
    children?: Array<Base>;
}
