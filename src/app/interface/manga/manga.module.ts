import { NgModule } from '@angular/core';

import { MangaComponent } from './manga.component';
import { MangaDetailComponent } from './detail/manga-detail.component';
import { MangaListComponent } from './list/manga-list.component';

@NgModule({
    imports: [
        
    ],
    declarations: [
        MangaComponent,
        MangaDetailComponent,
        MangaListComponent
    ],
    exports: [
        // MUST export to prevent duplicated components
        MangaComponent,
        MangaDetailComponent,
        MangaListComponent
    ],
    providers: [

    ]
})
export class MangaModule { }