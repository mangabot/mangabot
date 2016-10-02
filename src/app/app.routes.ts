import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const AppRoutes: Routes = [
    { path: '', redirectTo: '/sites', pathMatch: 'full' },
    { path: '**', redirectTo: '/sites' }
];

export const AppRoutingProviders: any[] = [

];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(AppRoutes);