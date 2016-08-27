import { Routes } from '@angular/router';

import { AboutRoutes } from './+about/index';
import { HomeRoutes } from './+home/index';
import { MangaRoutes } from './manga/index';
import { GrabberRoutes } from './grabber/index';

export const routes: Routes = [
  ...HomeRoutes,
  ...AboutRoutes,
  ...MangaRoutes,
  ...GrabberRoutes
];
