import {Component, Input} from 'angular2/core';

declare var jQuery: any;
declare var Clipboard: any;

@Component({
    selector: 'clipboard-item',
    template: 
    `
        <i [attr.data-clipboard-text]="data" 
            [attr.data-content]="'Copied to clipboard'"
            [attr.data-variation]="'inverted mini'"
            
            class="{{selector}} copy icon"></i>
    `
})
export class ClipBoardItem {
    @Input() data: string;
    private selector = "s" + new Date().getTime();
    ngAfterViewInit() {
        new Clipboard('.' + this.selector);
        jQuery('.' + this.selector).popup({
            on: 'click'
        });
    }
}