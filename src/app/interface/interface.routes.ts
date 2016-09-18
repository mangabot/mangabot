import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { GrabberComponent } from './grabber/grabber.component';
import { ConverterComponent } from './converter/converter.component';
import { MangaListComponent, MangaDetailComponent } from './manga';

const InterfaceRoutes: Routes = [
  { path: 'manga', component: MangaListComponent },
  { path: 'manga/:site', component: MangaDetailComponent },
  { path: 'grabber', component: GrabberComponent },
  { path: 'converter', component: ConverterComponent }
];

export const InterfaceRouting: ModuleWithProviders = RouterModule.forChild(InterfaceRoutes);