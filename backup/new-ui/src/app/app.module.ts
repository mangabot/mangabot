import { NgModule } from '@angular/core';
// App modules
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainModule } from './main/main.module';




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
