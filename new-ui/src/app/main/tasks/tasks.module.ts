import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from 'app/shared/shared.module';
import { CoreModule } from 'app/core/core.module';
import { TasksComponent } from './tasks.component';
import { TaskListComponent } from './task-list/task-list.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,

    SharedModule,
    CoreModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [],
  declarations: [
    TasksComponent,
    TaskListComponent
  ],
  exports: []
})
export class TasksModule { }