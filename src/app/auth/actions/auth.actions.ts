import {ActionWithPayload, createTypedAction} from '../../shared/utils/redux.utils';
import {Injectable} from '@angular/core';
import {AccessTokenWithUser} from '../access-token.model';

@Injectable()
export class AuthActions {

  public static readonly LOGIN = '[Auth Actions] Login';
  public static readonly LOGIN_SUCCESS = '[Auth Actions] Login Success';
  public static readonly LOGIN_FAILED = '[AUTH Actions] Login Failed';

  public static readonly REFRESH_TOKEN = '[Auth Actions] Refresh Token';
  public static readonly REFRESH_TOKEN_SUCCESS = '[Auth Actions] Refresh Token Success';
  public static readonly REFRESH_TOKEN_FAILED = '[Auth Actions] Refresh Token Failed';

  public static readonly LOGOUT = '[Auth Actions] Logout';
  public static readonly LOGOUT_SUCCESS = '[Auth Actions] Logout Success';

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

  loginFailed(errorCode: number): ActionWithPayload<AuthPayload> {
    return createTypedAction<AuthPayload>(AuthActions.LOGIN_FAILED, {
      errorCode: errorCode
    });
  }

  refreshToken(): ActionWithPayload<AuthPayload> {
    return createTypedAction<AuthPayload>(AuthActions.REFRESH_TOKEN, {});
  }

  refreshTokenSuccess(refreshedAccessTokenWithUser: AccessTokenWithUser): ActionWithPayload<AuthPayload> {
    return createTypedAction<AuthPayload>(AuthActions.REFRESH_TOKEN_SUCCESS, {
      accessTokenWithUser: refreshedAccessTokenWithUser
    });
  }

  refreshTokenFailed(errorCode: number): ActionWithPayload<AuthPayload> {
    return createTypedAction<AuthPayload>(AuthActions.REFRESH_TOKEN_FAILED, {
      errorCode: errorCode
    });
  }

  logout(): ActionWithPayload<AuthPayload> {
    return createTypedAction<AuthPayload>(AuthActions.LOGOUT, {});
  }

  logoutSuccess(): ActionWithPayload<AuthPayload> {
    return createTypedAction<AuthPayload>(AuthActions.LOGOUT_SUCCESS, {});
  }
}

export interface AuthPayload {
  login?: string;
  password?: string;
  accessTokenWithUser?: AccessTokenWithUser;
  errorCode?: number;
}
