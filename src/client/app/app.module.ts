import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { JsonpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

import { AboutModule } from './+about/about.module';
import { HomeModule } from './+home/home.module';
import { SharedModule } from './shared/shared.module';
import { MangaModule } from './manga/manga.module';
import { GrabberModule } from './grabber/grabber.module';

@NgModule({
  imports: [BrowserModule, HttpModule, JsonpModule, RouterModule.forRoot(routes), AboutModule, HomeModule, SharedModule.forRoot(), MangaModule, GrabberModule],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }],
  bootstrap: [AppComponent]

})

export class AppModule { }
