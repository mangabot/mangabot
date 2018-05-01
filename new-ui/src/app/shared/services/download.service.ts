import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable()
export class DownloadService {
  private isProd = environment.production

  constructor() { }

  /**
   * Make sure set responseType = ResponseContentType.Blob when call http methods.
   * 
   * http://stackoverflow.com/questions/37046133/pdf-blob-is-not-showing-content-angular-2?answertab=active#tab-top
   * 
   * For example: this.http.get('url', { responseType: ResponseContentType.Blob })
   * 
   * @param response 
   */
  pdf(response, fileName: string) {
    let blob = new Blob([response], { type: 'application/pdf' });
    // let fileName = response.headers.get('content-disposition');
    // if (fileName) {
    //   fileName = fileName.substr(fileName.indexOf('=') + 1);
    // }
    let downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
}