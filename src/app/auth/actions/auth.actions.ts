import { ActionWithPayload, createTypedAction } from '../../shared/utils/redux.utils';
import { Injectable } from '@angular/core';
import { AccessTokenWithUser } from '../access-token.model';

@Injectable()
export class AuthActions {

  public static readonly LOGIN = '[Auth Actions] Login';
  public static readonly LOGIN_SUCCESS = '[Auth Actions] Login Success';
  public static readonly LOGIN_FAILED = '[AUTH Actions] Login Failed';

  login(login: string, password: string): ActionWithPayload<AuthPayload> {
    return createTypedAction<AuthPayload>(AuthActions.LOGIN, {
      login: login,
      password: password
    });
  }

  loginSuccess(accessToken: AccessTokenWithUser) {
    return createTypedAction<AuthPayload>(AuthActions.LOGIN_SUCCESS, {
      accessTokenWithUser: accessToken
    });
  }
}

export interface AuthPayload {
  login?: string;
  password?: string;
  accessTokenWithUser?: AccessTokenWithUser;
  errorStatus?: number;
}
