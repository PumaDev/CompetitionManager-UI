import { Routes } from '@angular/router';
import { BaseComponent } from './base.component';
import { welcomeRoutes } from './welcome/welcomeRoutes';
import { competitionRoutes } from './competitions/competition.routes';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: BaseComponent,
        children: [
          ...welcomeRoutes,
          ...competitionRoutes
        ]
      },
    ]
  }
];

export const baseRoutes: Routes = routes;
