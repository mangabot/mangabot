import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';

import { SitesComponent } from './sites.component';
import { SiteListComponent } from './site-list/site-list.component';
import { MangaListComponent } from './manga-list/manga-list.component';
import { MangaListRowComponent } from './manga-list/manga-list-row.component';
import { ChapterListComponent } from './manga-list/chapter-list.component';
import { ChapterListRowComponent } from './manga-list/chapter-list-row.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,

    SharedModule,
    CoreModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [],
  declarations: [
    SitesComponent,
    SiteListComponent,
    MangaListComponent,
    MangaListRowComponent,
    ChapterListComponent,
    ChapterListRowComponent
  ],
  exports: []
})
export class SitesModule { }