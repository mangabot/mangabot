import { AfterViewInit, Directive, ElementRef, EventEmitter, Output } from "@angular/core";
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

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
    fromEvent($input, 'keyup').pipe(
      map((e: any) => e.target.value),
      filter(text => text.length > 1),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(text => this.search.emit(text));
  }
}