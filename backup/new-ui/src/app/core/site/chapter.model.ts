import { StringUtils } from 'src/app/shared';
import { SiteType } from "./site.model";

export class Chapter {
  id: string;
  name: string;
  url: string;
  savePath: string;
  site: string;

  constructor(name?: string, url?: string) {
    this.id = StringUtils.createUUID();
    this.name = name;
    this.url = url;
  }
}