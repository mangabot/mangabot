import { Component, OnInit, ViewChild } from '@angular/core';
import { SiteService, Site } from 'app/core';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.scss']
})
export class SiteListComponent implements OnInit {

  vnSites = new Array<Site>();
  enSites = new Array<Site>();

  constructor(private siteService: SiteService) { }

  ngOnInit() {
    this.vnSites = this.siteService.getVNSites();
    this.enSites = this.siteService.getENSites();
  }
}
