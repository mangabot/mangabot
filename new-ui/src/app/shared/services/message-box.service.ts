import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class MessageBox {
  private isProd = environment.production

  constructor() { }

  showSuccess(message: string) {
    if (window['X'] && this.isProd) {
      window['X'].showSuccess(message);
    } else {
      this.showMessage(true, message);
    }
  }

  showWarning(message: string) {
    if (window['X'] && this.isProd) {
      window['X'].showWarn(message);
    } else {
      this.showMessage(false, message);
    }
  }

  private showMessage(isSuccess: boolean, message: string) {
    if (isSuccess) {
      console.info(message);
    } else {
      console.warn(message);
    }
  }
}