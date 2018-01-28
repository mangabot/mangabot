import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import * as s from './';

@NgModule({
  declarations: [],
  exports: [],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [s.HttpCall],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
