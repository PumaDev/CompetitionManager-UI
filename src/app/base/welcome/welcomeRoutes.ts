import { Routes } from '@angular/router';
import { WelcomePageComponent } from './components/welcom-page/welcome-page.component';

export const welcomeRoutes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    component: WelcomePageComponent
  }
];
