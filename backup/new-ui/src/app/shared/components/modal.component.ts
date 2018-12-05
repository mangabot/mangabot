import {
  Component, Input, Output, ChangeDetectionStrategy,
  ViewChild, ElementRef, EventEmitter
} from "@angular/core";

declare var $: any;

@Component({
  selector: "app-modal",
  template: `
  <div class="ui modal {{class}}" #modal>
    <i class="close icon"></i>
    <div class="header">
      <ng-content select="modal-header"></ng-content>
    </div>
    <div class="{{contentClass}} content">
      <ng-content select="modal-content"></ng-content>
    </div>
    <div class="actions">
      <ng-content select="modal-actions"></ng-content>
    </div>
  </div>
  `,
  styles: [`
    .ui.modal .scrolling.content {
      max-height: calc(60vh);
      overflow: auto;
    }
    .ui.modal.fullscreen .scrolling.content {
      height: 80vh;
      max-height: none;
      overflow: auto;
    }
    .ui.modal.top.aligned {
      top: 0 !important;
      margin-top: 5vh !important;
    }
  `]
})
export class ModalComponent {
  @Input() class: string;
  @Input() set scrolling(val) {
    if (val == true || val === 'true') {
      this.contentClass = "scrolling";
    }
  }
  @Input() closable: string = "true";
  @Input() centered: string = "true";
  @Output("show") onShow = new EventEmitter();
  @Output() visible = new EventEmitter();
  @Output("hide") onHide = new EventEmitter();
  @Output() hidden = new EventEmitter();
  @Output() approve = new EventEmitter();
  @Output() deny = new EventEmitter();

  @ViewChild("modal") modal: ElementRef;

  contentClass = "";

  constructor() { }

  show(data?: {}) {
    let setting = Object.assign({
      closable: this.closable === "true",
      centered: this.centered === "true",
      onShow: () => this.onShow.emit(),
      onVisible: () => {
        // this.refreshPosition();
        this.visible.emit();
      },
      onHide: () => this.onHide.emit(),
      onHidden: () => this.hidden.emit(),
      onApprove: () => this.approve.emit(),
      onDeny: () => this.deny.emit(),
    }, data);

    $(this.modal.nativeElement).modal('setting', setting).modal('show');
  }

  hide() {
    $(this.modal.nativeElement).modal("hide");
  }

  refreshPosition() {
    $(this.modal.nativeElement).modal('refresh');
  }

}