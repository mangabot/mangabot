import { Component, ViewChild, EventEmitter, Output } from "@angular/core";
import { Observable } from 'rxjs';
import { ModalComponent } from './modal.component';

declare var jQuery: any;

@Component({
  selector: "message-box",
  templateUrl: "./message-box.component.html",
  styles: [
    `
    .success {
      color: #19b37b!important;
    }
    .error {
      color: #e64333!important;
    }
    `
  ]
})
export class MessageBoxComponent {
  @ViewChild("modal") modal: ModalComponent;

  title: string;
  message: string;
  isSuccess: boolean;
  closedCb: () => any;

  constructor() { }

  showSuccess(title: string, message: string) {
    this.title = title;
    this.message = message;
    this.isSuccess = true;
    this.modal.show({ onApprove: () => false, onDeny: () => false });
    return this;
  }

  showError(title: string, message: string) {
    this.title = title;
    this.message = message;
    this.isSuccess = false;
    this.modal.show({ onApprove: () => false, onDeny: () => false });
    return this;
  }

  hideModal() {
    this.modal.hide();
    this.reset();
  }

  closed(fn: () => any) {
    this.closedCb = fn ? fn : () => 0;
  }

  reset() {
    this.title = "";
    this.message = "";
  }

  onOKClicked() {
    this.hideModal();
    this.closedCb.apply(this);
  }
}