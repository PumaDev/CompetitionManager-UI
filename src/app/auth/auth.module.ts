import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatInputModule, MatTabsModule } from '@angular/material';
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

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    BrowserAnimationsModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule
  ],
  exports: [
    LoginComponent
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    AuthService,
    LoginService,
    AuthEffects,
    AuthActions,
    CanActivateLoginPage,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccessTokenHeaderInterceptor,
      multi: true,
    }
  ]
})
export class AuthModule {

}
