import { Component, OnInit } from '@angular/core';
import { SiteOption } from './site.option';

@Component({
  selector: 'mb-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  private sites: SiteOption[] = [
        {
            name: 'Blog Truyen',
            domain: 'blogtruyen.com',
            logoUrl: '',
            mangaListUrl: 'http://blogtruyen.com/danhsach/tatca'
        } as SiteOption,

        {
            name: 'Vechai',
            logoUrl: '',
            mangaListUrl: ''
        } as SiteOption
    ];

  constructor() {

  }

  ngOnInit() {
  }

}
