import { Route } from '@angular/router';

import { MangaComponent } from './manga/manga.component';
import { GrabberComponent } from './grabber/grabber.component';
import { ConverterComponent } from './converter/converter.component';

export const InterfaceRoutes: Route[] = [
  { path: '', component: GrabberComponent },
  { path: 'manga', component: MangaComponent },
  { path: 'grabber', component: GrabberComponent },
  { path: 'converter', component: ConverterComponent }
];