import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CanActivateLoginPage } from './login-page.can-activate';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [CanActivateLoginPage]
  }
];

export const authRoutes = routes;
