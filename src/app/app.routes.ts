import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { interfaceRoutes } from './interface/interface.routes';
import { MangaComponent } from './interface/manga/manga.component';
import { GrabberComponent } from './interface/grabber/grabber.component';
import { ConverterComponent } from './interface/converter/converter.component';

const appRoutes: Routes = [
    { path: '', component: MangaComponent },
    { path: 'manga', component: MangaComponent },
    { path: 'manga/:site', component: MangaComponent },
    { path: 'grabber', component: GrabberComponent },
    { path: 'converter', component: ConverterComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
