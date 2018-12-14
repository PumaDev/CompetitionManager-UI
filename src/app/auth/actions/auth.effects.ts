import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Store } from '@ngrx/store';
import { State } from '../../app.reducers';
import { AuthActions, AuthPayload } from './auth.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ActionWithPayload } from '../../shared/utils/redux.utils';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AccessTokenWithUser } from '../access-token.model';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {

  @Effect() login$;

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
  }
}
