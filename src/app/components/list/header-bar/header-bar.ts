import {Component, Output, EventEmitter} from 'angular2/core';
import {ContactListService} from '../../../services/contact-list-service';

@Component({
    selector: 'header-bar',
    styleUrls: ['app/components/list/header-bar/header-bar.css'],
    templateUrl: 'app/components/list/header-bar/header-bar.html'
})
export class HeaderBar {  
    private numberOfItems: number = 0;
    private numberOfDuplications: number = 0;
    
    constructor(public contactListService: ContactListService) {
        this.contactListService.subscribe(change => {this.change()});
    }
    change() {
        this.contactListService.getStatistic()
                .map(res => res.json())
                .subscribe(res => {
                    this.numberOfItems = res.numberOfItems;
                    this.numberOfDuplications = res.numberOfDuplications;
                });
    }
}
