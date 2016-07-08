import {Component, Output, EventEmitter} from 'angular2/core';
import {Action, ActionStream} from '../../../../streams/action-stream';
declare var jQuery: any;

@Component({
    selector: 'lm-warning',
    templateUrl: 'app/components/modals/list/warning/warning.html',
    styleUrls: ['app/components/modals/list/warning/warning.css'],
})
export class LmWarning {
    private id = '#lm-warning';
    constructor(actionStream: ActionStream) {
        actionStream.getStream()
            .filter(action => action.id == 'show-warning')
            .subscribe(action => {
                this.show();
            });
    }
    
    ngAfterViewInit() {
        let self = this;
        jQuery(this.id).modal({
            onHide: function() {
            },
            onDeny: function(){
            },
            onApprove: function() {
            }
        });
    }
    
    show() {
        jQuery(this.id).modal('show');
    }
}
