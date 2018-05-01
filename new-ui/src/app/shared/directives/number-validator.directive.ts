import { Directive, forwardRef, Attribute, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, Validators, ValidationErrors } from '@angular/forms';
import { StringUtils } from '../utils/string-utils';

@Directive({
  selector: '[numberValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: forwardRef(() => NumberValidatorDirective), multi: true }]
})
export class NumberValidatorDirective implements Validator {
  @Input("min") min: number;
  @Input("max") max: number;

  validate(control: AbstractControl): ValidationErrors | null {
    let inputValue = control.value;
    let inputString = String(inputValue);

    if (control.valid && inputValue != null && StringUtils.isNotBlank(inputString)) {
      let controlValue = inputString.replace(',', '');
      const value = Number(controlValue);
      const min = Number(this.min);
      const max = Number(this.max);

      if (isNaN(value)) {
        return { number: true };
      }

      if (!isNaN(min) && value < min) {
        return { min: true };
      }

      if (!isNaN(max) && value > max) {
        return { max: true };
      }
    }

    // Return null means it's valid
    return null;
  }
}
