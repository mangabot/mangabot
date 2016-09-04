import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const AppRoutes: Routes = [
    { path: '', redirectTo: '/manga', pathMatch: 'full' }
];

export const AppRoutingProviders: any[] = [

];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(AppRoutes);