import {Injectable} from 'angular2/core';
import {RouteParams} from 'angular2/router';

import {BehaviorSubject} from 'rxjs/subject/BehaviorSubject';

export class RouteService {
    private changes: BehaviorSubject<RouteParams> = new BehaviorSubject(null);
    
    next(params: RouteParams) {
        this.changes.next(params);
    }
    
    subscribe(observerOrNext?: any | ((value) => void), error?: (error: any) => void, complete?: () => void) {
        this.changes.subscribe(observerOrNext, error, complete);
    }
}