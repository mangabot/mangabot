import {Component, Directive, Input} from 'angular2/core';
import {Router} from 'angular2/router';

import {Action, ActionStream} from '../../streams/action-stream';
import {Contact} from '../../models/contact';
import {RouteService} from '../../services/route-service';
import {SideBarService} from '../../services/sidebar-service';
import {BackendService} from '../../services/backend-service';

declare var jQuery: any;

@Component({
    selector: 'navigation-bar',
    templateUrl: 'app/components/navigation-bar/navigation-bar.html', 
    styleUrls: ['app/components/navigation-bar/navigation-bar.css']
})
export class NavigationBar {
    private listId: string;
    private templateUrl: string;
    constructor(routeService: RouteService, 
        backendService: BackendService, 
        private router: Router, 
        private sidebar: SideBarService, 
        private actionStream: ActionStream) {
        this.templateUrl = backendService.getAppUrl('/assets/templates/list-import.csv');
        routeService.subscribe(params => {
            if (params) {
                this.listId = params.get('listId');
            } else {
                this.listId = undefined;
            }
        });
    }
    ngAfterViewInit() {
        jQuery('.navigation-bar .ui.dropdown').dropdown({
            action: 'hide',
            transition: 'drop'
        });
    }
    addNewList() {
        this.actionStream.next(new Action('create-list'));
    }
    importList() {
        this.actionStream.next(new Action('import-list'));
    }
    navigate(route) {
        this.router.navigateByInstruction(this.router.generate(route));
    }
    addNewContact() {
        let action = {
            id: 'create-contact',
            name: 'show',
            data: {
                contact: new Contact()
            }
        }
        this.sidebar.next(action);
    }
}
