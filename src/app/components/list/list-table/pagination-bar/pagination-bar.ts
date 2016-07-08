import {Component, Input, Output, EventEmitter} from 'angular2/core';

@Component({
    selector: 'pagination-bar',
    templateUrl: 'app/components/list/list-table/pagination-bar/pagination-bar.html',
    styleUrls: ['app/components/list/list-table/pagination-bar/pagination-bar.css']
})
export class PaginationBar {
    
    private currentPage: number = 0;
    private totalItems: number = 0;
    private totalPageItems: number = 0;
    private totalPages: number = 0;
    private numberOfPages: number = 0;
    private pagesPerSection: number = 5;
    private itemRange: string = '0';
    private fromPage: number = 0;
    private toPage: number = 0;
    private pages: number[] = [];
    
    @Input() itemsPerPage: number = 8;
    @Output() onPageChange = new EventEmitter();
    
    update(pageData: {currentPage: number, totalItems:number, totalPageItems:number, totalPages: number}) {
        this.currentPage = pageData.currentPage;
        this.totalItems = pageData.totalItems;
        this.totalPageItems = pageData.totalPageItems;
        this.totalPages = pageData.totalPages;
        if (this.totalPageItems > 0) {
            let lowIndex = this.currentPage * this.itemsPerPage + 1;
            if (this.totalPageItems > 1) {
                let hightIndex = lowIndex + this.totalPageItems - 1;
                if (hightIndex > this.totalItems) {
                    hightIndex = this.totalItems;
                }
                if (lowIndex > hightIndex) {
                    lowIndex = hightIndex;
                }
                this.itemRange = lowIndex + ' - ' + hightIndex;
            } else {
                this.itemRange = String(lowIndex);
            }
            let fromPage = (this.currentPage/this.pagesPerSection)|0;
            fromPage *= this.pagesPerSection;
            let toPage = fromPage + this.pagesPerSection - 1;
            if (toPage >= this.totalPages) {
                toPage = this.totalPages - 1;
            }
            let pages: number[] = [];
            while (fromPage <= toPage) {
                pages.push(fromPage++);
            }
            this.pages = pages;
            this.fromPage = fromPage;
            this.toPage = toPage;
        }
    }
       
    onSelect(page: number) {
        if (page >= 0 && page < this.totalPages) {
            this.onPageChange.next(page);
        }
    }
}
