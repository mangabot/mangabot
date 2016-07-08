import {Component, Input, Output, EventEmitter} from 'angular2/core';

import {Action, ActionStream} from '../../../../streams/action-stream';
import {FullDateTimeStringPipe} from '../../../../pipes/full-date-time-string';

@Component({
    selector: 'action-bar',
    pipes: [FullDateTimeStringPipe],
    templateUrl: 'app/components/contact/contact-table/action-bar/action-bar.html',
    styleUrls: ['app/components/contact/contact-table/action-bar/action-bar.css']
})
export class ActionBar {
    @Input() actionInfo;
    @Output() search = new EventEmitter();
    @Output() edit = new EventEmitter();
    @Output() selectAll = new EventEmitter();
    @Output() clearSelection = new EventEmitter();
    private keyword: string = '';
    constructor(private actionStream: ActionStream) {}
    delete() {
        this.actionStream.next(new Action('delete-contact', this.actionInfo));
    }
    remove() {
        this.actionStream.next(new Action('remove-contact', this.actionInfo));
    }
    canEdit() {
        return this.actionInfo && this.actionInfo.mode != 'ALL' && this.actionInfo.items.length == 1;
    }
    canDelete() {
        return this.actionInfo && this.actionInfo.items.length > 0;
    }
    canRemove() {
        if (this.actionInfo) {
            let contactList = this.actionInfo.contactList;
            return contactList && contactList.id != 'all' && this.actionInfo.items.length > 0;
        }
        return false;
    }
    requestSearch() {
        this.search.next(this.keyword);
    }
}
