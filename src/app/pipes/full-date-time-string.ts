import {Pipe, PipeTransform} from 'angular2/core';
declare var moment: any;

@Pipe({name: 'fullDateTimeString'})
export class FullDateTimeStringPipe implements PipeTransform {
  transform(value:Date, args:string[]) : any {
      return moment(value).format('MMM Do YYYY, hh:mm a');
  }
}
