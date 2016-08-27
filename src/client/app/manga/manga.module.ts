import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MangaComponent } from './manga.component';

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [MangaComponent],
    exports: [MangaComponent],
    providers: []
})
export class MangaModule { }
