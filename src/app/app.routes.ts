import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const AppRoutes: Routes = [
    { path: '', redirectTo: '/manga', pathMatch: 'full' },
    { path: '**', redirectTo: '/manga' }
];

export const AppRoutingProviders: any[] = [

];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(AppRoutes);