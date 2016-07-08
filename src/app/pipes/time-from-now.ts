import {Pipe, PipeTransform} from 'angular2/core';
declare var moment: any;

@Pipe({name: 'timeFromNow'})
export class TimeFromNowPipe implements PipeTransform {
  transform(value:Date, args:string[]) : any {
     let diff = new Date().getTime() - value.getTime();
     if (diff > 30*24*60*60000) {
         return moment(value).format('MMM DD, YYYY');
     }
     return moment(value).fromNow();
  }
}
