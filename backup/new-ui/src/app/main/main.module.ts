import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// External libraries modules

// App modules
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { SitesModule } from './sites/sites.module';
import { TasksModule } from './tasks/tasks.module';


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    SharedModule,
    CoreModule,

    MainRoutingModule,

    SitesModule,
    TasksModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainModule { }
