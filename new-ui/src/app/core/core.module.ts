import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'app/shared/shared.module';
import { CredentialInterceptor } from './credential.interceptor';
import * as c from './';

@NgModule({
  declarations: [

  ],
  exports: [

  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CredentialInterceptor,
      multi: true
    },
    c.SiteService,
    c.BlogTruyenService
  ]
})
export class CoreModule { }
