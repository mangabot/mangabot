import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpCall } from 'app/shared';

declare var fetch: any;
// import * as fetch from 'fetch';

@Injectable()
export class PageSourceService {

  constructor(private httpCall: HttpCall) { }

  getPageSource(url: string): Observable<string> {
    return this.httpCall.getText(url);
  }

}