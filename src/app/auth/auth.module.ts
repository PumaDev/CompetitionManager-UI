import {APP_INITIALIZER, NgModule, OnInit} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatInputModule, MatProgressSpinnerModule, MatTabsModule } from '@angular/material';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { CanActivateLoginPage } from './login-page.can-activate';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthActions } from './actions/auth.actions';
import { CommonModule } from '@angular/common';
import { LoginService } from './services/login.service';
import { AuthEffects } from './actions/auth.effects';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccessTokenHeaderInterceptor } from './access-token-header.interceptor';
import { AdminAndDeveloperCanActivate } from './can-activate/admin-and-developer.can-activate';
import { RegisterComponent } from './components/register/register.component';
import { RegistrationActions } from './actions/register/registration.actions';
import { RegistrationEffects } from './actions/register/registration.effects';
import { RegisterSmartComponent } from './components/register/register.smart.component';
import {interval} from 'rxjs';
import {Store} from '@ngrx/store';
import {State} from '../app.reducers';
import {IAccessToken} from '../shared/permissions/models/permission.models';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    BrowserAnimationsModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterModule,
  ],
  exports: [
    LoginComponent
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    RegisterSmartComponent
  ],
  providers: [
    AuthService,
    LoginService,
    AuthEffects,
    AuthActions,
    RegistrationActions,
    RegistrationEffects,
    CanActivateLoginPage,
    AdminAndDeveloperCanActivate,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccessTokenHeaderInterceptor,
      multi: true,
    }
  ]
})
export class AuthModule {
  constructor(private store: Store<State>,
              private authActions: AuthActions) {
    interval(10 * 60 * 1000).subscribe(() => {
      const jsonAccessToken: string = localStorage.getItem('access-token');
      if (jsonAccessToken) {
        this.store.dispatch(this.authActions.refreshToken());
      }
    });
  }

}
