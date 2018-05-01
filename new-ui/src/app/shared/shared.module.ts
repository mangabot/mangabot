import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import * as s from './';

@NgModule({
  declarations: [
    s.SelectValidatorDirective,
    s.FocusDirective,
    s.KeypressFilterDirective,
    s.SearchStreamDirective,
    s.StopClickEventPropagationDirective,
    s.NumberValidatorDirective,

    s.CapitalizeEnumPipe,
    s.SanitizeHtml,

    s.ModalComponent,
    s.MessageBoxComponent,
    s.PaginationComponent
  ],
  exports: [
    s.SelectValidatorDirective,
    s.FocusDirective,
    s.KeypressFilterDirective,
    s.SearchStreamDirective,
    s.StopClickEventPropagationDirective,
    s.NumberValidatorDirective,

    s.CapitalizeEnumPipe,
    s.SanitizeHtml,

    s.ModalComponent,
    s.MessageBoxComponent,
    s.PaginationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    s.MessageBox,
    s.DownloadService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
