import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { GrabberComponent } from './grabber/grabber.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TaskListComponent } from './task-list/task-list.component';
import { ConverterComponent } from './converter/converter.component';
import { MangaComponent } from './manga/manga.component';
import { MangaDetailComponent } from './manga/detail/manga-detail.component';
import { MangaListComponent } from './manga/list/manga-list.component';
import { InterfaceRouting } from './interface.routes';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule,
        InterfaceRouting
    ],
    declarations: [
        GrabberComponent,
        SidebarComponent,
        TaskListComponent,
        ConverterComponent,
        MangaComponent,
        MangaDetailComponent,
        MangaListComponent
    ],
    exports: [
        // MUST export to prevent duplicated components
        SidebarComponent,
        TaskListComponent
    ],
    providers: [

    ]
})
export class InterfaceModule { }