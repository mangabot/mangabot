import {Subject} from "rxjs/Rx";

export class Action {
    constructor(public id: string, public data?: any) {}
}

export class ActionStream {
    private stream = new Subject<Action>();
    
    next(action: Action) {
        this.stream.next(action);
    }
    
    getStream() {
        return this.stream;
    }
}