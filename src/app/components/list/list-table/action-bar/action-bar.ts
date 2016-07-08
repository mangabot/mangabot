import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {Action, ActionStream} from '../../../../streams/action-stream';

@Component({
    selector: 'action-bar',
    templateUrl: 'app/components/list/list-table/action-bar/action-bar.html',
    styleUrls: ['app/components/list/list-table/action-bar/action-bar.css']
})
export class ActionBar {
    @Input() actionInfo;
    @Output() search = new EventEmitter();
    @Output() selectAll = new EventEmitter();
    @Output() clearSelection = new EventEmitter();
    private keyword: string = '';
    
    constructor(private actionStream: ActionStream) {}
    
    canEdit() {
        return this.actionInfo && this.actionInfo.mode != 'ALL' && this.actionInfo.items.length == 1;
    }
    
    canDelete() {
        return this.actionInfo && this.actionInfo.items.length > 0;
    }
    
    requestSearch() {
        this.search.next(this.keyword);
    }
    
    edit() {
        this.actionStream.next(new Action('edit-list', this.actionInfo.items[0]));
    }
    
    delete() {
        this.actionStream.next(new Action('delete-list', this.actionInfo));
    }
}
