import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InterfaceRoutes } from './interface/interface.routes';

export const AppRoutes: Routes = [
    ...InterfaceRoutes
];

export const AppRoutingProviders: any[] = [

];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(AppRoutes);