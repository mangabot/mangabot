import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MangaSite, SiteEnum, SiteEnumHelper } from '../../domain';
import { MangaSiteService } from '../../application';

@Component({
	selector: 'mb-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
	siteEnumHelper = SiteEnumHelper;
	vnSites: MangaSite[];
	enSites: MangaSite[];

	constructor(private route: ActivatedRoute) {
		this.vnSites = MangaSiteService.getVnList();
		this.enSites = MangaSiteService.getEnList();
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
		// this.router.navigate(['/manga', SiteEnumHelper.getStringValue(ms.site)]);
	}
}
