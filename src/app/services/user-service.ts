import {Injectable, Inject} from 'angular2/core';

import {BackendService} from '../services/backend-service';
import {User} from '../models/user';

@Injectable()
export class UserService {
    private currentUser;
    private backendService: BackendService;
    
    constructor(backendService: BackendService) {
        this.backendService = backendService;
        this.backendService
            .get("/app/users/")
            .map(res => res.json())
            .subscribe(res => {
                this.currentUser = res;
            });
    }
     
    getCurrentUser() : User {
        return this.currentUser;
    }
}
