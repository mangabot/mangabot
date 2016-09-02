import { Component, OnInit } from '@angular/core';
import { MangaSite, SiteEnum } from '../../domain';

@Component({
	selector: 'mb-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
	sites: MangaSite[] = [
		new MangaSite(SiteEnum.BLOGTRUYEN, 'Blog Truyen', 'http://blogtruyen.com', 'http://blogtruyen.com/ajax/Search/AjaxLoadListManga?key=tatca&orderBy=1&p='),
		new MangaSite(SiteEnum.KISSMANGA, 'Kiss Manga', 'http://kissmanga.com', 'http://kissmanga.com/MangaList?page=')
	];

	constructor() {

	}

	ngOnInit() {

	}

}
