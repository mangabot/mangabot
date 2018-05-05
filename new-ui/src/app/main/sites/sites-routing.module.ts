import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SitesComponent } from './sites.component';
import { SiteListComponent } from './site-list/site-list.component';
import { MangaListComponent } from './manga-list/manga-list.component';

export const sitesRoutes: Routes = [
  {
    path: 'sites',
    component: SitesComponent,
    children: [
      { path: '', component: SiteListComponent },
      { path: ':id', component: MangaListComponent }
    ]
  }
];