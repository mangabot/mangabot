import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';

import { paymentsRoutes } from './payments/payments-routing.module';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    children: [
      ...paymentsRoutes
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MainRoutingModule { }