import {Subject} from "rxjs/Rx";

export class ModalEvent {
    constructor(public id: string, public data: Object) {}
}
export var MODAL_EVENT_STREAM = new Subject<ModalEvent>();
