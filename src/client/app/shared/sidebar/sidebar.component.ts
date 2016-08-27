import { Component } from '@angular/core';
import { Site } from './site.model';

@Component({
    moduleId: module.id,
    selector: 'mb-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.css']
})
export class SidebarComponent {
    private sites: Site[] = [
        {
            name: 'Blog Truyen',
            domain: 'blogtruyen.com',
            logoUrl: '',
            mangaListUrl: 'http://blogtruyen.com/danhsach/tatca'
        } as Site,

        {
            name: 'Vechai',
            logoUrl: '',
            mangaListUrl: ''
        } as Site
    ];
}