import { NgModule } from '@angular/core';

// App modules
import { CoreModule } from 'app/core/core.module';
import { SharedModule } from 'app/shared/shared.module';
import { MainModule } from './main/main.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    MainModule,

    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
