import {Component, Input, Output, EventEmitter} from 'angular2/core';
declare var jQuery: any;

@Component({
    selector: 'checkbox',
    template: `
        <div id="{{id}}" class="ui checkbox {{class}} child-control">
            <input type="checkbox">
            <label class="child-control"></label>
        </div>
    `
})
export class CheckBox {
    @Input() id;
    @Input() class;
    @Input() data;
    @Output() onChecked = new EventEmitter();
    @Output() onUnchecked = new EventEmitter();
    
    ngAfterViewInit() {
        var self = this;
        jQuery('#' + this.id).checkbox({
            onChecked: function() {
                self.onChecked.emit({id: self.id, data: self.data});
            },
            onUnchecked: function() {
                self.onUnchecked.emit({id: self.id, data: self.data});
            }
        });
    }
}