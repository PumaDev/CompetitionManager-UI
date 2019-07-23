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
import {IAccessToken} from '../../shared/permissions/models/permission.models';

@Injectable()
export class AuthEffects {

  @Effect() login$;
  @Effect() refreshToken$;
  @Effect() refreshTokenSuccess$;

  constructor(private store: Store<State>,
              private actions$: Actions<ActionWithPayload<AuthPayload>>,
              private authActions: AuthActions,
              private loginService: LoginService) {

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
          sessionStorage.setItem('access-token', JSON.stringify(accessToken));
          return of(createTypedAction('NONE', {}));
        }
      )
    );
  }
}
