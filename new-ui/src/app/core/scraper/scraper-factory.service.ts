import { Injectable } from "@angular/core";
import { ScraperService } from "./scraper.service";
import { BlogTruyenScraperService } from "./blogtruyen-scraper.service";
import { SiteType } from "../site/site.model";


@Injectable()
export class ScraperFactoryService {

  constructor(
    private blogTruyenScraperService: BlogTruyenScraperService
  ) {

  }

  getScraper(siteType: SiteType): ScraperService {
    return this.blogTruyenScraperService;
  }
}