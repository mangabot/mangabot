import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { GrabberComponent } from './grabber/grabber.component';
import { ConverterComponent } from './converter/converter.component';
import { MangaComponent, MangaListComponent, MangaListHomeComponent, MangaDetailComponent } from './manga';
import { SearchComponent } from './search';

const InterfaceRoutes: Routes = [
  {
    path: '',
    redirectTo: '/sites/blogtruyen',
    pathMatch: 'full'
  },
  {
    path: 'sites/:site',
    component: MangaComponent,
    children: [
      {
        path: '',
        component: MangaListComponent,
        children: [
          { path: '', component: MangaListHomeComponent },
          { path: ':manga', component: MangaDetailComponent }
        ]
      }
    ]
  },
  { path: 'grabber', component: GrabberComponent },
  { path: 'converter', component: ConverterComponent }
];

export const InterfaceRouting: ModuleWithProviders = RouterModule.forChild(InterfaceRoutes);