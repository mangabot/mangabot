import { Injectable } from "@angular/core";
import { Site, BlogTruyen, IZManga, MangaVN, MangaFox, KissManga } from "./site.model";

@Injectable()
export class SiteService {

  constructor() { }


  getVNSites(): Array<Site> {
    return [BlogTruyen, IZManga, MangaVN];
  }

  getENSites(): Array<Site> {
    return [MangaFox, KissManga];
  }

  getSites(): Array<Site> {
    return [BlogTruyen, IZManga, MangaVN, MangaFox, KissManga];
  }
}