import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { SiteEnum } from '../../../domain';
import { SiteHelper } from '../../../application';

@Component({
  selector: 'mb-manga',
  templateUrl: './manga-detail.component.html',
  styleUrls: ['./manga-detail.component.css']
})
export class MangaDetailComponent implements OnInit, OnDestroy {

  constructor(private http: Http) {

  }

  getHeroes() {
    return this.http.get("app/mangaList").toPromise()
      .then(response => {
        console.log(response.json().data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

}
