import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({ selector: '[keypressFilter]' })
export class KeypressFilterDirective {
  @Input() set keyCode(val) {
    this._keyCode = +val;
  }
  @Output() keypressFilter = new EventEmitter<any>();

  private _keyCode;

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    if (event.keyCode === this._keyCode) {
      event.preventDefault();
      event.stopPropagation();
      this.keypressFilter.emit(event.keyCode);
      return false;
    }
  }

  constructor() { }

}