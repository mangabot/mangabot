import {Component, Input} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {NotificationService, Message, Status} from '../../services/notification-service';

@Component({
    selector: 'notification',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/components/notification/notification.html',
    styleUrls: ['app/components/notification/notification.css']
})
export class Notification {
    private messages: Message[] = [];
    constructor(private notificationService: NotificationService) {
        notificationService.subscribe(m => this.showMessage(m));
    }
    isError(message) {
        return message.status == Status.ERROR;
    }
    showMessage(message) {
        if (message) {
            this.messages.push(message);
        }
    }
    close() {
        this.messages.pop();
    }
}