import { Routes } from '@angular/router';
import { WelcomePageComponent } from './components/welcom-page/welcome-page.component';
import { CanActivateBasePage } from '../base.can-activate';

export const welcomeRoutes: Routes = [
  {
    path: 'welcome',
    component: WelcomePageComponent,
    canActivate: [CanActivateBasePage]
  }
];
