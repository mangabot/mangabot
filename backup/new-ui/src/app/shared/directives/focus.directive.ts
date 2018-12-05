import { Directive, AfterViewInit, ElementRef, Renderer, HostListener, Input, Output, EventEmitter } from "@angular/core";

@Directive({ selector: "[focus]", exportAs: 'focus' })
export class FocusDirective implements AfterViewInit {
  @Input("outDelayMs") outDelayMs = 0;
  @Output("delayedFocusout") delayedFocusout = new EventEmitter();

  @HostListener("focusout", ["$event"]) onFocusOut(event) {
    event.stopPropagation();
    event.preventDefault();
    setTimeout(() => this.delayedFocusout.emit(), this.outDelayMs);
  }

  constructor(private eleRef: ElementRef, private renderer: Renderer) {

  }

  ngAfterViewInit() {
    // this.focus();
  }

  focus() {
    setTimeout(() => this.renderer.invokeElementMethod(this.eleRef.nativeElement, 'focus'), 100);
  }
}