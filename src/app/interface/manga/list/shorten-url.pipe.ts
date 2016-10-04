import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'shortenUrl'})
export class ShortenUrlPipe implements PipeTransform {
    transform(value: string): string {
        console.log(value);
        let newVal:string ?= value;
        return value;
    }
}