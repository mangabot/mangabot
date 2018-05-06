import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Site, SiteService, ScraperFactoryService, SiteType, Manga, Chapter, ScraperService } from 'app/core';

@Component({
  selector: '[chapter-list]',
  templateUrl: './chapter-list.component.html'
})
export class ChapterListComponent implements OnInit {
  @Input("manga") manga: Manga;

  private loading = false;
  private expanded = false;
  private chapterList = new Array<Chapter>();
  private scraper: ScraperService;

  constructor(
    private scraperFactoryService: ScraperFactoryService,
    private siteService: SiteService
  ) { }

  ngOnInit() {
    this.scraper = this.scraperFactoryService.getScraper(SiteType[this.manga.site]);
    this.scraper.getChapterList(this.manga.url).subscribe(list => this.chapterList = list);
  }
}
