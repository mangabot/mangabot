import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { GrabberComponent } from './grabber/grabber.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TaskListComponent } from './task-list/task-list.component';
import { ConverterComponent } from './converter/converter.component';
import { MangaModule } from './manga';
import { InterfaceRouting } from './interface.routes';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        RouterModule,
        MangaModule,
        InterfaceRouting
    ],
    declarations: [
        GrabberComponent,
        SidebarComponent,
        TaskListComponent,
        ConverterComponent
    ],
    exports: [
        // MUST export to prevent duplicated components
        GrabberComponent,
        SidebarComponent,
        TaskListComponent,
        ConverterComponent
    ],
    providers: [

    ]
})
export class InterfaceModule { }