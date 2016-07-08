import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {UUID} from '../../../../utils/uuid';

declare var jQuery: any;

@Component({
    selector: 'field-selector',
    template: `
        <div id="{{id}}" class="ui fluid selection dropdown">
            <i class="dropdown icon"></i>
            <div class="text">{{selected}}</div>
            <div class="menu">
                <div class="item" *ngFor="#header of headers">{{header}}</div>
            </div>
        </div>
    `
})
export class FieldSelector {
    @Input() index:number;
    @Input() selected:string;
    private id = UUID.randomUuid();
    @Output() change = new EventEmitter();
   
    private headers = [
        'Title', 
        'First name', 
        'Last name', 
        'Phone number', 
        'Email address', 
        'Job title', 
        'Company', 
        'Street address',
        'City',
        'State',
        'Excluded'
    ];
    ngAfterViewInit() {
        var self = this;
        if (this.index < 3) {
            jQuery('#' + this.id).dropdown({
                onChange: function name(value, text) {
                    self.change.emit({value: value, text: text});
                }
            });
        } else {
            jQuery('#' + this.id).dropdown({
                direction: 'upward',
                onChange: function name(value, text) {
                    self.change.emit({value: value, text: text});
                }
            });
        }
    }
}