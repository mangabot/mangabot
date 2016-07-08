import {Subject} from 'rxjs/Rx';

export enum Status {
    SUCCESS,
    ERROR
}

export class Message {
    public static SUCCESS = "success";
    public static ERROR = "error";
    constructor(
        public status: Status, 
        public header: string, 
        public meta: string, 
        public description: string, 
        public link?: {
            text: string,
            route: {}
        }){}
}

export class NotificationService {
    private notification = new Subject<Message>();
    
    subscribe(func: any) {
        this.notification.subscribe(func);
    }
    notify(message: Message) {
        this.notification.next(message);
    }
}