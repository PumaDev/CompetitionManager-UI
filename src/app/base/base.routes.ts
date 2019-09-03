import {Routes} from '@angular/router';
import {BaseComponent} from './base.component';
import {competitionRoutes} from './competitions/competition.routes';
import {CanActivateBasePage} from './base.can-activate';
import {userRoutes} from './users/user.routes';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: BaseComponent,
        children: [
          ...competitionRoutes,
          ...userRoutes
        ]
      }
    ],
    canActivate: [CanActivateBasePage]
  }
];

export const baseRoutes: Routes = routes;
