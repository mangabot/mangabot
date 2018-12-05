import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Chapter, Manga, ScraperFactoryService, ScraperService, SiteService } from 'src/app/core';

@Component({
  selector: '[manga-list-row]',
  templateUrl: './manga-list-row.component.html',
  styles: [`
    
  `]
})
export class MangaListRowComponent implements OnInit {
  @Input("manga") manga: Manga;
  @Output("expanded") expandedEmitter = new EventEmitter();
  @Output("collapsed") collapsedEmitter = new EventEmitter();

  private loading = false;
  expanded = false;
  private chapterList = new Array<Chapter>();
  private scraper: ScraperService;

  constructor(
    private scraperFactoryService: ScraperFactoryService,
    private siteService: SiteService
  ) { }

  ngOnInit() {

  }

  toggleExpanded() {
    this.expanded = !this.expanded;
    if (this.expanded) {
      this.expandedEmitter.emit();
    } else {
      this.collapsedEmitter.emit();
    }
  }

  addToQueue() {

  }
}
