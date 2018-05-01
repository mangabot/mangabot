import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// External libraries modules

// App modules
import { CoreModule } from 'app/core/core.module';
import { SharedModule } from 'app/shared/shared.module';

import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';

import { HeaderComponent } from './header/header.component';

import { PaymentsModule } from './payments/payments.module';


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    SharedModule,
    CoreModule,

    MainRoutingModule,

    PaymentsModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainModule { }
