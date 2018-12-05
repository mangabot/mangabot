import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PageSourceService } from './page-source.service';

@NgModule({
  declarations: [

  ],
  exports: [

  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [PageSourceService]
})
export class CoreModule { }
