import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrabberComponent } from './grabber/grabber.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TaskListComponent } from './task-list/task-list.component';
import { MangaComponent } from './manga/manga.component';
import { ConverterComponent } from './converter/converter.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        GrabberComponent,
        SidebarComponent,
        TaskListComponent,
        MangaComponent,
        ConverterComponent
    ],
    exports: [
        GrabberComponent,
        SidebarComponent,
        TaskListComponent,
        MangaComponent,
        ConverterComponent
    ],
    providers: []
})
export class InterfaceModule { }
