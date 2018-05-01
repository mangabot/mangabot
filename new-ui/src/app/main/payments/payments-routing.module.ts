import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentsComponent } from './payments.component';
import { PaymentListComponent } from './payment-list/payment-list.component';

export const paymentsRoutes: Routes = [
  {
    path: 'payments',
    component: PaymentsComponent,
    children: [
      { path: '', component: PaymentListComponent }
    ]
  }
];