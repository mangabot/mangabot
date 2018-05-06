import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Site, SiteService, ScraperFactoryService, SiteType, Manga, Chapter, ScraperService } from 'app/core';

@Component({
  selector: 'app-manga-list',
  templateUrl: './manga-list.component.html',
  styleUrls: ['./manga-list.component.scss']
})
export class MangaListComponent implements OnInit {

  private siteId = '';
  private loading = false;
  private sites = new Array<Site>();
  private activatedSite: Site;
  private totalPages = 1;
  private mangaList = new Array<Manga>();
  private chapterList = new Array<Chapter>();
  private chapterCache = new Map<string, Array<Chapter>>();
  private scraper: ScraperService;

  constructor(
    private route: ActivatedRoute,
    private scraperFactoryService: ScraperFactoryService,
    private siteService: SiteService
  ) { }

  ngOnInit() {
    this.sites = this.siteService.getSites();

    this.route.params.pipe(
      filter(params => params['id'] != null),
      map(params => params['id'])
    ).subscribe(id => {
      this.siteId = id;
      this.loading = true;
      this.activatedSite = this.sites.find(s => s.type === SiteType[SiteType[id]]);
      this.scraper = this.scraperFactoryService.getScraper(SiteType[this.activatedSite.type]);
      this.scraper.getTotalPages().subscribe(total => this.totalPages = total);
      this.scraper.getMangaList(3).subscribe(list => this.mangaList = list);
      this.scraper.getChapterList("http://blogtruyen.com/14183/rebirth").subscribe(list => console.log(list));
    });
  }

  getMangaInfo(manga: Manga) {
    if (this.chapterCache.has(manga.id)) {
      this.chapterList = this.chapterCache[manga.id];
    } else {
      this.scraper.getChapterList(manga.url).subscribe(list => this.chapterCache.set(manga.id, list));
    }
  }
}
