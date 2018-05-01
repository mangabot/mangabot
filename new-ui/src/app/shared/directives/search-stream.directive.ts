import { Directive, Output, EventEmitter, AfterViewInit, ElementRef } from "@angular/core";
import { Observable } from 'rxjs';

declare var $: any;

@Directive({ selector: "[searchStream]" })
export class SearchStreamDirective implements AfterViewInit {
  @Output() search = new EventEmitter();

  constructor(private eleRef: ElementRef) { }

  ngAfterViewInit() {
    this.bindEvent();
  }

  private bindEvent() {
    let $input = $(this.eleRef.nativeElement);
    Observable.fromEvent($input, 'keyup')
      .map((e: any) => e.target.value)
      .filter(text => text.length > 1)
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(text => this.search.emit(text));
  }
}