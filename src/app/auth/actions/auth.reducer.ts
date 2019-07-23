import {ActionState} from '../../shared/general/general.models';
import {ActionWithPayload, deepCloneMerge} from '../../shared/utils/redux.utils';
import {AuthActions, AuthPayload} from './auth.actions';
import {AccessTokenWithUser} from '../access-token.model';

export interface IAuthState {
  accessTokenWithUser: AccessTokenWithUser;
  errorCode: number;
  actionState: ActionState;
}

const initialAuthState: IAuthState = {
  accessTokenWithUser: null,
  errorCode: 0,
  actionState: ActionState.INITIAL
};

export function authReducer(
  state: IAuthState = initialAuthState,
  action: ActionWithPayload<AuthPayload>
): IAuthState {
  switch (action.type) {
    case AuthActions.REFRESH_TOKEN:
    case AuthActions.LOGIN:
      return deepCloneMerge(state, {
        actionState: ActionState.IN_PROGRESS
      });

    case AuthActions.REFRESH_TOKEN_SUCCESS:
    case AuthActions.LOGIN_SUCCESS:
      return deepCloneMerge(state, {
        accessTokenWithUser: action.payload.accessTokenWithUser,
        actionState: ActionState.SUCCEEDED
      });

    case AuthActions.REFRESH_TOKEN_FAILED:
    case AuthActions.LOGIN_FAILED:
      return deepCloneMerge(state, {
        errorCode: action.payload.errorCode,
        actionState: ActionState.FAILED
      });

    default:
      return state;
  }
}
