import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './tasks.component';
import { TaskListComponent } from './task-list/task-list.component';

export const tasksRoutes: Routes = [
  {
    path: 'tasks',
    component: TasksComponent,
    children: [
      { path: '', component: TaskListComponent }
    ]
  }
];