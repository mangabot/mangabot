import { Routes } from '@angular/router';

import { MangaComponent } from './manga/manga.component';
import { GrabberComponent } from './grabber/grabber.component';
import { ConverterComponent } from './converter/converter.component';

export const InterfaceRoutes: Routes = [
  { path: 'manga', component: MangaComponent },
  { path: 'manga/:site', component: MangaComponent },
  { path: 'grabber', component: GrabberComponent },
  { path: 'converter', component: ConverterComponent }
];
