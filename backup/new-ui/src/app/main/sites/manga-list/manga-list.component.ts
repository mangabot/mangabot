import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, repeat, switchMap, tap } from 'rxjs/operators';
import { Manga, ScraperFactoryService, ScraperService, Site, SiteService, SiteType } from 'src/app/core';

@Component({
  selector: 'app-manga-list',
  templateUrl: './manga-list.component.html',
  styleUrls: ['./manga-list.component.scss']
})
export class MangaListComponent implements OnInit {

  private loading = false;
  private sites = new Array<Site>();
  private activatedSite: Site;
  private totalPages = 1;
  private mangaList = new Array<Manga>();
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
      this.loading = true;
      this.activatedSite = this.sites.find(s => s.type === SiteType[SiteType[id]]);
      this.scraper = this.scraperFactoryService.getScraper(SiteType[this.activatedSite.type]);

      this.mangaList = new Array();

      this.scraper.getTotalPages().pipe(
        tap(total => this.totalPages = total),
        switchMap(total => this.scraper.getMangaList(4).pipe(repeat(5)))
      ).subscribe(list => {
        list.forEach(item => this.mangaList.push(item));
      }, null, () => {
        this.loading = false;
        console.log('Fetch manga completed.');
      });
    });
  }
}
