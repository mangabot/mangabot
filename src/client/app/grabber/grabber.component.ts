import { Component } from '@angular/core';
import { MangaService} from '../shared/manga.service';

@Component({
    moduleId: module.id,
    selector: 'mb-grabber',
    templateUrl: 'grabber.component.html',
    styleUrls: ['grabber.component.css']
})
export class GrabberComponent {

    constructor(public mangaService: MangaService) {}

    grabChapters(mangaUrl: string) {
        let url = 'http://blogtruyen.com/ajax/Search/AjaxLoadListManga?key=tatca&orderBy=1&p=1';
        return this.mangaService.getList(url).subscribe();
    }
}