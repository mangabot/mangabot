import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { GrabberComponent } from './grabber/grabber.component';
import { ConverterComponent } from './converter/converter.component';
import { MangaListComponent, MangaDetailComponent } from './manga';

export const InterfaceRoutes: Routes = [
  { path: '', redirectTo: '/manga', pathMatch: 'full' },
  { path: 'manga', component: MangaListComponent },
  { path: 'manga/:site', component: MangaDetailComponent },
  { path: 'grabber', component: GrabberComponent },
  { path: 'converter', component: ConverterComponent }
];
// TODO once upgrade to rc.6, should review it
export const InterfaceRouting: ModuleWithProviders = RouterModule.forChild(InterfaceRoutes);