import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrabberComponent } from './interface/grabber';

const AppRoutes: Routes = [
    { path: '', redirectTo: '/sites', pathMatch: 'full' },
    { path: 'home', component: GrabberComponent }
];

export const AppRoutingProviders: any[] = [

];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(AppRoutes);