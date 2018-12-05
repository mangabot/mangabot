import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpCall } from './http-call.service';

@Injectable()
export class PageSourceService {

  constructor(private httpCall: HttpCall) { }

  getPageSource(url: string): Observable<string> {
    return this.httpCall.getText(url);
  }

}