import { ActionState } from '../../shared/general/general.models';
import { IAccessToken, IUser } from '../../shared/permissions/models/permission.models';
import { ActionWithPayload, deepCloneMerge } from '../../shared/utils/redux.utils';
import { AuthActions, AuthPayload } from './auth.actions';
import { AccessTokenWithUser } from '../access-token.model';

export interface IAuthState {
  accessTokenWithUser: AccessTokenWithUser;
  errorStatue: number;
  actionState: ActionState;
}

const initialAuthState: IAuthState = {
  accessTokenWithUser: null,
  errorStatue: 0,
  actionState: ActionState.INITIAL
};

export function authReducer(
  state: IAuthState = initialAuthState,
  action: ActionWithPayload<AuthPayload>
): IAuthState {
    switch (action.type) {
      case AuthActions.LOGIN:
        return deepCloneMerge(state, {
          actionState: ActionState.IN_PROGRESS
        });

      case AuthActions.LOGIN_SUCCESS:
        return deepCloneMerge(state, {
          accessTokenWithUser: action.payload.accessTokenWithUser,
          actionState: ActionState.SUCCEEDED
        });

      case AuthActions.LOGIN_FAILED:
        return deepCloneMerge(state, {
          errorStatus: action.payload.errorStatus,
          actionState: ActionState.FAILED
        });

      default:
        return state;
    }
}
