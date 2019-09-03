import {Injectable} from '@angular/core';
import {LoginService} from '../services/login.service';
import {Store} from '@ngrx/store';
import {State} from '../../app.reducers';
import {AuthActions, AuthPayload} from './auth.actions';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ActionWithPayload, createTypedAction} from '../../shared/utils/redux.utils';
import {catchError, map, switchMap} from 'rxjs/operators';
import {AccessTokenWithUser} from '../access-token.model';
import {HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {ActivateStatus, IAccessToken} from '../../shared/permissions/models/permission.models';
import {Router} from '@angular/router';

@Injectable()
export class AuthEffects {

  @Effect() login$;
  @Effect() loginSuccess$;
  @Effect() refreshToken$;
  @Effect() refreshTokenSuccess$;
  @Effect() logout$;
  @Effect() logoutSuccess$;

  constructor(private store: Store<State>,
              private actions$: Actions<ActionWithPayload<AuthPayload>>,
              private authActions: AuthActions,
              private loginService: LoginService,
              private router: Router) {

    /*************************************************************
     * Login
     ************************************************************/
    this.login$ = this.actions$.pipe(
      ofType(AuthActions.LOGIN),
      map((action: ActionWithPayload<AuthPayload>) => ({...action.payload})),
      switchMap(({login, password}: { login: string, password: string }) =>
        this.loginService.login(login, password)
          .pipe(
            map((accessTokenWithUser: AccessTokenWithUser) => this.authActions.loginSuccess(accessTokenWithUser)),
            catchError((errorResponse: HttpErrorResponse) =>
              of(this.authActions.loginFailed(errorResponse.error.errorCode))
            )
          )
      )
    );

    /*************************************************************
     * Login Success
     ************************************************************/
    this.loginSuccess$ = this.actions$.pipe(
      ofType(AuthActions.LOGIN_SUCCESS),
      map((action: ActionWithPayload<AuthPayload>) => ({...action.payload})),
      switchMap(({accessTokenWithUser}: { accessTokenWithUser: AccessTokenWithUser }) => {
          if (accessTokenWithUser.user.activateStatus === ActivateStatus.ACTIVE) {
            const accessToken: IAccessToken = {token: accessTokenWithUser.token, expiresIn: new Date()};
            localStorage.setItem('access-token', JSON.stringify(accessToken));
            localStorage.setItem('user', JSON.stringify(accessTokenWithUser.user));

            this.router.navigateByUrl('/competitions');
          }

          return of(createTypedAction('NONE', {}));
        }
      )
    );

    /*************************************************************
     * Refresh Token
     ************************************************************/
    this.refreshToken$ = this.actions$.pipe(
      ofType(AuthActions.REFRESH_TOKEN),
      map((action: ActionWithPayload<AuthPayload>) => ({...action.payload})),
      switchMap(({}: {}) =>
        this.loginService.refreshToken()
          .pipe(
            map((accessTokenWithUser: AccessTokenWithUser) => {
              return this.authActions.refreshTokenSuccess(accessTokenWithUser);
            }),
            catchError((errorResponse: HttpErrorResponse) =>
              of(this.authActions.refreshTokenFailed(errorResponse.error.errorCode))
            )
          )
      )
    );

    /*************************************************************
     * Refresh Token Success
     ************************************************************/
    this.refreshTokenSuccess$ = this.actions$.pipe(
      ofType(AuthActions.REFRESH_TOKEN_SUCCESS),
      map((action: ActionWithPayload<AuthPayload>) => ({...action.payload})),
      switchMap(({accessTokenWithUser}: { accessTokenWithUser: AccessTokenWithUser }) => {
          const accessToken: IAccessToken = {token: accessTokenWithUser.token, expiresIn: new Date()};
          localStorage.setItem('access-token', JSON.stringify(accessToken));
          return of(createTypedAction('NONE', {}));
        }
      )
    );

    /*************************************************************
     * Logout
     ************************************************************/
    this.logout$ = this.actions$.pipe(
      ofType(AuthActions.LOGOUT),
      switchMap(() => {
        console.log('Remove access token from storage');
        localStorage.removeItem('access-token');
        localStorage.removeItem('user');

        return of(this.authActions.logoutSuccess());
      })
    );

    /*************************************************************
     * Logout
     ************************************************************/
    this.logoutSuccess$ = this.actions$.pipe(
      ofType(AuthActions.LOGOUT_SUCCESS),
      switchMap(() => {
        console.log('Navigate to login page');

        this.router.navigateByUrl('/login');

        return of(createTypedAction('NONE', {}));
      })
    );
  }
}
