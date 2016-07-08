import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {COMMON_DIRECTIVES} from 'angular2/common';

import {RouteService} from '../../services/route-service';
import {Notification} from '../notification/notification';
import {HeaderBar} from './header-bar/header-bar';
import {ListTable} from './list-table/list-table';

@Component({
    selector: 'list',
    directives: [COMMON_DIRECTIVES, Notification, HeaderBar, ListTable],
    template: `
        <notification></notification>
        <header-bar></header-bar>
        <list-table></list-table>
    `
})
export class List {
    constructor(params: RouteParams, routeService: RouteService) {
        routeService.next(params);
    }
}
