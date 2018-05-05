import { SiteType } from "./site.model";

export class Manga {
  id: string;
  name: string;
  url: string;
  savePath: string;
  site: string;

  constructor(name?: string, url?: string) {
    this.name = name;
    this.url = url;
  }
}