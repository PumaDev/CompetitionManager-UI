import { IUser } from '../../../shared/permissions/models/permission.models';
import { ActionState } from '../../../shared/general/general.models';
import { ActionWithPayload, deepCloneMerge } from '../../../shared/utils/redux.utils';
import { RegistrationActions, RegistrationPayload } from './registration.actions';

export interface IRegistrationState {
  createdUser: IUser;
  errorCode: number;
  state: ActionState;
}

const initRegistrationState = {
  createdUser: null,
  state: ActionState.INITIAL,
  errorCode: 0
};

export function registrationReducer(
  state: IRegistrationState = initRegistrationState,
  action: ActionWithPayload<RegistrationPayload>
): IRegistrationState {
  switch (action.type) {
    case RegistrationActions.REGISTRATION:
      return deepCloneMerge(state, {
        createdUser: null,
        errorCode: 0,
        state: ActionState.IN_PROGRESS
      });
    case RegistrationActions.REGISTRATION_SUCCESS:
      return deepCloneMerge(state, {
        createdUser: action.payload.user,
        state: ActionState.SUCCEEDED
      });
    case RegistrationActions.REGISTRATION_FAILURE:
      return deepCloneMerge(state, {
        errorCode: action.payload.errorCode,
        state: ActionState.FAILED
      });
    default:
      return state;
  }
}
