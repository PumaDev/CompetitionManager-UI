import {IUser} from '../models/users.model';
import {ActionState} from '../../../shared/general/general.models';
import {ActionWithPayload, deepCloneMerge} from '../../../shared/utils/redux.utils';
import {IUsersPayload, UsersActions} from '../actions/users.actions';

export interface IUsersState {
  users: IUser[];
  errorCode: number;
  state: ActionState;
  user: IUser;
}

const initUsersState: IUsersState = {
  users: [],
  errorCode: 0,
  user: null,
  state: ActionState.INITIAL
};

export function usersReducer(
  state: IUsersState = initUsersState,
  action: ActionWithPayload<IUsersPayload>
) {
  switch (action.type) {
    case UsersActions.LOAD_USERS:
    case UsersActions.UPDATE_ACTIVE_STATUS:
    case UsersActions.UPDATE_USER:
    case UsersActions.UPDATE_USER_PASSWORD:
      return deepCloneMerge(state, {
        state: ActionState.IN_PROGRESS
      });

    case UsersActions.LOAD_USERS_SUCCESS:
      return deepCloneMerge(state, {
        users: action.payload.users,
        state: ActionState.SUCCEEDED
      });

    case UsersActions.UPDATE_ACTIVE_STATUS_SUCCESS:
      return deepCloneMerge(state, {
        users: replaceUserInList(action.payload.user, state.users),
        state: ActionState.SUCCEEDED
      });

    case UsersActions.LOAD_USERS_FAILURE:
    case UsersActions.UPDATE_ACTIVE_STATUS_FAILURE:
    case UsersActions.UPDATE_USER_FAILURE:
    case UsersActions.LOAD_USER_FAILURE:
    case UsersActions.UPDATE_USER_PASSWORD_FAILURE:
      return deepCloneMerge(state, {
        errorCode: action.payload.errorCode,
        state: ActionState.FAILED
      });

    case UsersActions.LOAD_USER:
      return deepCloneMerge(state, {
        user: null,
        actionState: ActionState.IN_PROGRESS
      });

    case UsersActions.LOAD_USER_SUCCESS:
      return deepCloneMerge(state, {
        user: action.payload.user,
        actionState: ActionState.SUCCEEDED
      });

    case UsersActions.UPDATE_USER_SUCCESS:
      return deepCloneMerge(state, {
        actionState: ActionState.IN_PROGRESS
      });

    case UsersActions.UPDATE_USER_PASSWORD_SUCCESS:
      return deepCloneMerge(state, {
        actionState: ActionState.SUCCEEDED
      });

    default:
      return state;
  }
}

function replaceUserInList(newUser: IUser, list: IUser[]): IUser[] {
  const newList = deepCloneMerge(list, {});
  const index = list.findIndex((user: IUser) => user.id === newUser.id);
  newList[index] = newUser;

  return newList;
}
