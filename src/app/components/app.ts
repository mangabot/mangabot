///<reference path="../../../node_modules/angular2/typings/browser.d.ts"/>

import {Component, ViewChild} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

import {List} from './list/list';
import {Modals} from './modals/modals';
import {Contact} from './contact/contact';
import {ContactDetail} from './contact/contact-detail/contact-detail';
import {ContactCreateEdit} from './contact/contact-create-edit/contact-create-edit';
import {NavigationBar} from './navigation-bar/navigation-bar';

import {SCREEN} from '../utils/screen';
import {SERVICE_PROVIDERS} from '../services/providers';
import {STREAM_PROVIDERS} from '../streams/providers';
import {UserService} from '../services/user-service';
import {SideBarService} from '../services/sidebar-service';
declare var jQuery: any;

@Component({
    selector: 'app',
    directives: [ROUTER_DIRECTIVES, NavigationBar, ContactDetail, ContactCreateEdit, Modals],
    providers: [STREAM_PROVIDERS, SERVICE_PROVIDERS],
    template: `
        <div id="application" [class.ldpi]="!isHdDisplay">
            <div class="ui right vertical sidebar">
                <contact-detail #contactDetail></contact-detail>
                <contact-create-edit #contactCreateEdit></contact-create-edit>
            </div>
            <div class="pusher">
                <div id="contact-manager-app">
                    <navigation-bar></navigation-bar>
                    <router-outlet></router-outlet>
                </div>
            </div>
       </div>
       <modals></modals>
    `,
    styles: [`
        .sidebar {
            background: #fff;
            width: 275px;
        }
        #contact-manager-app {
            background-color: #fff;
        }
    `]
})
@RouteConfig([
    { path: '/', component: List, name: 'List'},
    { path: '/lists/:listId', component: Contact, name: 'Contact'}
])
class AppComponent {
    @ViewChild('contactDetail') contactDetail: ContactDetail; 
    @ViewChild('contactCreateEdit') contactCreateEdit: ContactCreateEdit; 
    private actionId: string;
    private isHdDisplay = SCREEN.isHdDisplay();
    constructor(private sidebar: SideBarService) {
        sidebar.subscribe(action => {
            this.actionId = action.id;
            if (action.id == 'show-contact') {
                this.contactCreateEdit.hide();
                this.contactDetail.show(action.data);
            } else if (action.id == 'edit-contact' || action.id == 'create-contact') {
                this.contactDetail.hide();
                this.contactCreateEdit.show(action.data);
            }
            jQuery('.ui.sidebar').sidebar(action.name);
        });
    }
    ngAfterViewInit() {
        jQuery('.ui.sidebar').sidebar({
            closable: false,
            transition: 'overlay',
            dimPage: false,
            context: '#application'
        });
    }
}
bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS]);
