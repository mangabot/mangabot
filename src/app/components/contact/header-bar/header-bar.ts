import {Component, Input} from 'angular2/core';
import {Router} from 'angular2/router';

import {User} from '../../../models/user';
import {UserService} from '../../../services/user-service';

@Component({
    selector: 'header-bar',
    styleUrls: ['app/components/contact/header-bar/header-bar.css'],
    templateUrl: 'app/components/contact/header-bar/header-bar.html'
})
export class HeaderBar {  
    @Input() contactList;
    private user: User;
    constructor(public router: Router, userService: UserService) {
        this.user = userService.getCurrentUser();
    }
    
    back() {
        this.router.navigateByUrl('/');
    }
}
