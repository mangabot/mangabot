import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MangaSite, SiteEnum, SiteEnumHelper } from '../../domain';

@Component({
	selector: 'mb-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

	vnSites: MangaSite[] = [
		new MangaSite(SiteEnum.BLOGTRUYEN, 'blogtruyen.com', 'http://blogtruyen.com', 'http://blogtruyen.com/ajax/Search/AjaxLoadListManga?key=tatca&orderBy=1&p='),
		new MangaSite(SiteEnum.TRUYENTRANH8, 'truyentranh8.net', 'http://kissmanga.com', 'http://kissmanga.com/MangaList?page='),
		new MangaSite(SiteEnum.TRUYENTRANHTUAN, 'truyentranhtuan.com', 'http://kissmanga.com', 'http://kissmanga.com/MangaList?page='),
		new MangaSite(SiteEnum.HOCVIENTRUYENTRANH, 'truyen.academyvn.com', 'truyen.academyvn.com', 'http://kissmanga.com/MangaList?page='),
		new MangaSite(SiteEnum.IZTRUYENTRANH, 'iztruyentranh.com', 'http://kissmanga.com', 'http://kissmanga.com/MangaList?page='),
		new MangaSite(SiteEnum.LHMANGA, 'lhmanga.com', 'http://kissmanga.com', 'http://kissmanga.com/MangaList?page='),
		new MangaSite(SiteEnum.TRUYENTRANHNET, 'truyentranh.net', 'http://kissmanga.com', 'http://kissmanga.com/MangaList?page='),
		new MangaSite(SiteEnum.TRUYENTRANHMOI, 'truyentranhmoi.com', 'http://kissmanga.com', 'http://kissmanga.com/MangaList?page='),
		new MangaSite(SiteEnum.MANGAK, 'mangak.info', 'http://kissmanga.com', 'http://kissmanga.com/MangaList?page='),
		new MangaSite(SiteEnum.UPTRUYEN, 'uptruyen.com', 'http://kissmanga.com', 'http://kissmanga.com/MangaList?page=')
	];

	enSites: MangaSite[] = [
		new MangaSite(SiteEnum.MANGAFOX, 'mangafox.me', 'http://kissmanga.com', 'http://kissmanga.com/MangaList?page='),
		new MangaSite(SiteEnum.MANGAPARK, 'mangapark.me', 'http://kissmanga.com', 'http://kissmanga.com/MangaList?page=')
	];

	public siteEnumHelper = SiteEnumHelper;

	constructor(private router: Router, private activatedRoute: ActivatedRoute) {

	}

	ngOnInit() {
		// Subscribe to detect when url param changed to apply changes to reuse this component
		// this.sub = this.activatedRoute.params.subscribe(params => {
		// 	let activeSite = params['site'];
		// 	this.service.getHero(id).then(hero => this.hero = hero);
		// });
	}

	ngOnDestroy() {
		// this.sub.unsubscribe();
	}

	onSelect(ms: MangaSite) {
		this.router.navigate(['/manga', SiteEnumHelper.getStringValue(ms.site)]);
	}
}
