import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'sanitizeHtml' })
export class SanitizeHtml implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(v: string) {
    if (v == null) {
      return "";
    }
    return this.sanitizer.bypassSecurityTrustHtml(v);
  }
}