import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CanActivateLoginPage } from './login-page.can-activate';
import { RegisterSmartComponent } from './components/register/register.smart.component';
import { LoginMobileComponent } from './components/login/login.mobile.component';
import { ResponsiveComponents } from '../shared/screen-state/mobile.state';
import { RegisterMobileSmartComponent } from './components/register/mobile/register.mobile.smart.component';

const authResponsiveComponents: ResponsiveComponents = new ResponsiveComponents();
authResponsiveComponents.add(LoginComponent, LoginMobileComponent);
authResponsiveComponents.add(RegisterSmartComponent, RegisterMobileSmartComponent);

const routes: Routes = [
  {
    path: 'login',
    component: authResponsiveComponents.get(LoginComponent),
    canActivate: [CanActivateLoginPage]
  },
  {
    path: 'registration',
    component: authResponsiveComponents.get(RegisterSmartComponent),
    canActivate: [CanActivateLoginPage]
  }
];

export const authRoutes = routes;
