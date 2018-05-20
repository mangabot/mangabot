import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Site, SiteService, ScraperFactoryService, SiteType, Manga, Chapter, ScraperService } from 'src/app/core';

@Component({
  selector: '[manga-list-row]',
  templateUrl: './manga-list-row.component.html',
  styles: [`
    .tick .checkbox {
      position: relative;
      border: 1px solid #3882fd;
      width: 14px;
      height: 14px;
      display: inline-block;
    }
    .tick .checkbox i {
      font-size: 14px;
      position: absolute;
      top: 0px;
      left: 0px;
    }
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
}
