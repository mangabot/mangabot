import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'capitalizeEnum' })
export class CapitalizeEnumPipe implements PipeTransform {

  transform(value: string) {
    if (value == null) {
      return '';
    }

    let result = "";

    value.split("_").forEach(p => {
      if (result !== '') {
        result += ' ';
      }
      if (p.length === 1) {
        result += p.toUpperCase();
      } else if (p.length > 1) {
        result += p[0].toUpperCase() + p.substr(1).toLowerCase();
      }
    });

    return result;
  }
}