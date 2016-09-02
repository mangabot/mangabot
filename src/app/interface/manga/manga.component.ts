import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteEnum } from '../../domain';
import { SiteHelper } from '../../application';

@Component({
  selector: 'mb-manga',
  templateUrl: './manga.component.html',
  styleUrls: ['./manga.component.css']
})
export class MangaComponent implements OnInit, OnDestroy {

  private activeSite: SiteEnum;

  // constructor(private route: ActivatedRoute, private router: Router) {

  // }

  constructor() {}

  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   this.activeSite = SiteHelper.parseString(params['site']);
    // });
  }

  ngOnDestroy() {

  }

}
