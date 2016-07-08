import {NotificationService} from './notification-service';
import {SideBarService} from './sidebar-service';
import {RouteService} from './route-service';
import {BackendService} from './backend-service';
import {CountryService} from './country-service';
import {S3Service} from './s3-service';
import {UserService} from './user-service';
import {ContactService} from './contact-service';
import {ContactListService} from './contact-list-service';

export const SERVICE_PROVIDERS:Array<any> = [
    NotificationService,
    SideBarService,
    RouteService,
    BackendService,
    CountryService,
    S3Service,
    UserService,
    ContactService,
    ContactListService
];