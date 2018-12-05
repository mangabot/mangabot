import { Directive, OnInit, Input, HostListener, HostBinding } from '@angular/core';

@Directive({ selector: '[stopClickEventPropagation]' })
export class StopClickEventPropagationDirective implements OnInit {

  @HostListener('click', ['$event']) onClick(event) {
    this.stopEventPropagation(event);
  }

  constructor() { }

  ngOnInit() { }

  private stopEventPropagation($event) {
    if ($event == null) {
      return;
    }
    // if ($event.preventDefault) {
    //   $event.preventDefault();
    // }
    if ($event.stopPropagation) {
      $event.stopPropagation();
    }
  }

}