import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CanActivateLoginPage } from './login-page.can-activate';
import { RegisterSmartComponent } from './components/register/register.smart.component';
import { LoginMobileComponent } from './components/login/login.mobile.component';
import { getComponentForCurrentScreenState } from '../shared/screen-state/mobile.state';
import { RegisterMobileSmartComponent } from './components/register/mobile/register.mobile.smart.component';

const routes: Routes = [
  {
    path: 'login',
    component: getComponentForCurrentScreenState(LoginComponent, LoginMobileComponent),
    canActivate: [CanActivateLoginPage]
  },
  {
    path: 'registration',
    component: getComponentForCurrentScreenState(RegisterSmartComponent, RegisterMobileSmartComponent),
    canActivate: [CanActivateLoginPage]
  }
];

export const authRoutes = routes;
