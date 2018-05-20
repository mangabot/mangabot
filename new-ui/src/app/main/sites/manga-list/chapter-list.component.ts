import { Component, Input, OnInit } from '@angular/core';
import { Chapter, Manga, ScraperFactoryService, ScraperService, SiteService, SiteType } from 'src/app/core';

@Component({
  selector: '[chapter-list]',
  templateUrl: './chapter-list.component.html',
  styles: [`
  .table .column:last-child {
    flex: 0 0 90px;
  }
  `]
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
