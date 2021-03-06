import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';

import { sitesRoutes } from './sites/sites-routing.module';
import { tasksRoutes } from './tasks/tasks-routing.module';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      ...sitesRoutes,
      ...tasksRoutes
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MainRoutingModule { }