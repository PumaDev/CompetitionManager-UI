import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CanActivateLoginPage } from './login-page.can-activate';
import { RegisterSmartComponent } from './components/register/register.smart.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [CanActivateLoginPage]
  },
  {
    path: 'registration',
    component: RegisterSmartComponent,
    canActivate: [CanActivateLoginPage]
  }
];

export const authRoutes = routes;
