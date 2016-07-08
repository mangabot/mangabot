import {Injectable} from 'angular2/core';
import {Subject} from 'rxjs/Rx';

export class SideBarService {
    private changes: Subject<any> = new Subject();
    
    next(data: any) {
        this.changes.next(data);
    }
    
    subscribe(observerOrNext?: any | ((value) => void), error?: (error: any) => void, complete?: () => void) {
        this.changes.subscribe(observerOrNext, error, complete);
    }
}