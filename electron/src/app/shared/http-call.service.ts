import { ipcRenderer } from 'electron';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

declare var fetch: any;


/**
 * Wrap node-fetch and expose Observable
 * 
 * https://www.npmjs.com/package/node-fetch
 */
@Injectable()
export class HttpCall {

  constructor() {
    ipcRenderer.on('download-file-reply', (event, arg) => {
      console.log(arg) // prints "pong"
    });
  }


  getText(url: string): Observable<string> {
    return Observable.fromPromise(
      fetch(url).then(res => {
        // must call this to next `then` can parse result
        return res.text();
      })
    ).map((res: any) => {
      let txt = res;
      console.log(txt);
      return txt;
    });
  }

  getJson(url: string): Observable<{}> {
    return Observable.fromPromise(
      fetch(url).then(res => {
        // must call this to next `then` can parse result
        return res.json();
      })
    ).map((res: any) => {
      let txt = res;
      console.log(txt);
      return txt;
    });
  }

  downloadFile(url: string) {
    ipcRenderer.send('download-file-message', { url: url, fileName: "abc.jpg" });
  }
}