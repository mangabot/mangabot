import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from 'app/shared/shared.module';
import { CoreModule } from 'app/core/core.module';

import { PaymentsComponent } from './payments.component';
import { PaymentListComponent } from './payment-list/payment-list.component';


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
    PaymentsComponent,
    PaymentListComponent
  ],
  exports: []
})
export class PaymentsModule { }