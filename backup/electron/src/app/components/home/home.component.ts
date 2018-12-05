import { Component, OnInit } from '@angular/core';
import { HttpCall } from 'app/shared';
import { PageSourceService } from 'app/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  url = "http://blogtruyen.com/c290149/thien-thanh-chap-60";
  downloadUrl = "http://4.bp.blogspot.com/-QzFNh8by72w/WmxJ4s6vo5I/AAAAAAAAr8w/s7Z808T3ewQwP8MymCJYToTXb8HpGIUBwCLcBGAs/1.jpg?imgmax=16383";
  pageSource = "";

  constructor(
    private pageSourceService: PageSourceService,
    private httpCall: HttpCall
  ) { }

  ngOnInit() {
  }

  getPageSource() {
    this.httpCall.downloadFile(this.downloadUrl);
    this.pageSourceService.getPageSource(this.url).subscribe(ps => console.debug(ps));
  }
}
