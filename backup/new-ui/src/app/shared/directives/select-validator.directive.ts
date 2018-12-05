import { Directive, OnInit, Input, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[selectValidator]',
  exportAs: 'ngModel'
})
export class SelectValidatorDirective implements OnInit {
  @Input("required") required: boolean;
  @Input("model") set model(value) {
    if (this.required != undefined) {
      if (value == null || (typeof value === "string" && value.trim() === "")) {
        this.setInvalid();
      } else {
        this.setValid();
      }
    } else {
      this.setValid();
    }
  }

  @HostListener("onChange") changed() {
    this.pristine = false;
    this.dirty = true;
  }

  pristine: boolean = true;
  dirty: boolean = false;
  invalid: boolean = false;
  valid: boolean = true;

  constructor() { }

  ngOnInit() { }

  private setValid() {
    this.invalid = false;
    this.valid = true;
  }

  private setInvalid() {
    this.invalid = true;
    this.valid = false;
  }
}