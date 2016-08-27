import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { GrabberComponent } from './grabber.component';

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [GrabberComponent],
    exports: [GrabberComponent],
    providers: []
})
export class GrabberModule { }
