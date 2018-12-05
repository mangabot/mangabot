import { Component, OnInit, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { URLSearchParams } from '@angular/http';

@Component({
  selector: 'app-pagination',
  template: `
  <div class="ui pagination menu right floated" *ngIf="totalPages > 1">
    <a class="icon item" (click)="changePage(currentPage - 1)" [ngClass]="{'disabled': firstPage}">
      <i class="chevron thin left icon"></i>
    </a>
    <a class="item" *ngFor="let page of pages; let i = index" (click)="changePage(page, i)" [ngClass]="{'active': currentPage == page}">
      {{page}}
    </a>
    <a class="icon item" (click)="changePage(currentPage + 1)" [ngClass]="{'disabled': lastPage}">
      <i class="chevron thin right icon"></i>
    </a>
  </div>
  `
})
export class PaginationComponent implements OnInit {
  @Input() totalCount: number = 0;
  @Input() perPage: number = 10;
  @Input() currentPage: number = 1;
  @Input() range: number = 5;
  @Output() pageChange = new EventEmitter<number>();

  private pages: Array<string> = [];
  totalPages: number = 1;
  private firstPage: boolean;
  private lastPage: boolean;

  constructor() {

  }

  ngOnInit() {
    this.firstPage = true;
    this.lastPage = false;
  }

  changePage(page: string, index: number) {
    if (page == '...') {
      if (index > Math.floor(this.range / 2)) {
        this.currentPage = Number.parseInt(this.pages[index - 1]) + 1;
      } else {
        this.currentPage = Number.parseInt(this.pages[index + 1]) + -1;
      }
    } else {
      this.currentPage = Number.parseInt(page);
    }

    this.firstPage = this.currentPage == 1;
    this.lastPage = this.currentPage == Math.ceil(this.totalCount / this.perPage);

    this.pageChange.emit(this.currentPage);
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    this.totalCount = +this.totalCount;
    this.perPage = +this.perPage;
    this.range = +this.range;
    this.totalPages = Math.ceil(this.totalCount / this.perPage);

    this.pages = this.generatePages();
  }

  private generatePages(): Array<string> {
    let pages: Array<string> = [];

    this.totalPages = Math.ceil(this.totalCount / this.perPage);
    let startPage: number = 0;
    let endPage: number = 0;
    if (this.totalPages <= this.range) {
      startPage = 1;
      endPage = this.totalPages;
      pages = this.generatePageNumbers(startPage, endPage, 'full');
    } else if (this.currentPage + this.range >= this.totalPages + 2) {
      startPage = this.totalPages + 2 - this.range;
      endPage = this.totalPages;
      pages = this.generatePageNumbers(startPage, endPage, 'end');
    } else if (this.currentPage <= this.range - 1) {
      startPage = 1;
      endPage = this.range - 1;
      pages = this.generatePageNumbers(startPage, endPage, 'start');
    } else {
      let offset: number = (this.range - 2 - 1) / 2;
      if (this.currentPage - 1 > this.totalPages - this.currentPage) {
        startPage = this.currentPage - Math.ceil(offset);
        endPage = this.currentPage + Math.floor(offset);
      } else {
        startPage = this.currentPage - Math.floor(offset);
        endPage = this.currentPage + Math.ceil(offset);
      }
      pages = this.generatePageNumbers(startPage, endPage, 'middle');
    }

    return pages;
  }

  private generatePageNumbers(startPage: number, endPage: number, part: string): Array<string> {
    let pages: Array<string> = [];
    switch (part) {
      case 'full':
        for (let page: number = startPage; page <= endPage; page++) {
          pages.push(page.toString());
        }
        break;
      case 'end':
        pages.push('1');
        pages.push('...');
        for (let page: number = startPage; page <= endPage; page++) {
          pages.push(page.toString());
        }
        break;
      case 'start':
        for (let page: number = startPage; page <= endPage; page++) {
          pages.push(page.toString());
        }
        pages.push('...');
        pages.push(this.totalPages.toString());
        break;
      default:
        pages.push('1');
        pages.push('...');
        for (let page: number = startPage; page <= endPage; page++) {
          pages.push(page.toString());
        }
        pages.push('...');
        pages.push(this.totalPages.toString());
        break;
    }

    return pages;
  }
}