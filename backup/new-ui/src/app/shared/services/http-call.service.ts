// import { ipcRenderer } from 'electron';

import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

declare var fetch: any;


/**
 * Wrap node-fetch and expose Observable
 * 
 * https://www.npmjs.com/package/node-fetch
 */
@Injectable()
export class HttpCall {

  constructor() {
    // ipcRenderer.on('download-file-reply', (event, arg) => {
    //   console.log(arg) // prints "pong"
    // });
  }


  getText(url: string): Observable<string> {
    return from(
      fetch(url).then(res => {
        // must call this to next `then` can parse result
        return res.text();
      })
    );
  }

  getJson(url: string): Observable<{}> {
    return from(
      fetch(url).then(res => {
        // must call this to next `then` can parse result
        return res.json();
      })
    );
  }

  downloadFile(url: string) {
    // ipcRenderer.send('download-file-message', { url: url, fileName: "abc.jpg" });
  }
}