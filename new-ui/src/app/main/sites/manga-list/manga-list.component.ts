import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { BlogTruyenService } from 'app/core';

@Component({
  selector: 'app-manga-list',
  templateUrl: './manga-list.component.html',
  styleUrls: ['./manga-list.component.scss']
})
export class MangaListComponent implements OnInit {

  private siteId = '';

  constructor(
    private route: ActivatedRoute,
    private blogTruyenService: BlogTruyenService
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      filter(params => params['id'] != null),
      map(params => params['id'])
    ).subscribe(id => {
      this.siteId = id;
      this.blogTruyenService.getTotalPages().subscribe();
      this.blogTruyenService.getMangaList(3).subscribe(list => console.log(list));
      this.blogTruyenService.getChapterList("http://blogtruyen.com/14183/rebirth").subscribe(list => console.log(list));
    });
  }

}
