import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'shortenUrl'})
export class ShortenUrlPipe implements PipeTransform {
    transform(value: string): string {
        console.log(value);
        let newVal = value ? value : '';
        return newVal.replace(/\s*https?:\/\/(www\.)?[^\/]+/gi, '');
    }
}