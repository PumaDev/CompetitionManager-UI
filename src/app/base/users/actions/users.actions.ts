import {Injectable} from '@angular/core';
import {ActionWithPayload, createTypedAction} from '../../../shared/utils/redux.utils';
import {ActiveStatus, IUpdateUserPasswordView, IUser} from '../models/users.model';

@Injectable()
export class UsersActions {

  static readonly LOAD_USERS = '[Users] Load Users';
  static readonly LOAD_USERS_SUCCESS = '[Users] Load Users Success';
  static readonly LOAD_USERS_FAILURE = '[Users] Load Users Failure';

  static readonly UPDATE_ACTIVE_STATUS = '[Users] Update Active Status';
  static readonly UPDATE_ACTIVE_STATUS_SUCCESS = '[Users] Update Active Status Success';
  static readonly UPDATE_ACTIVE_STATUS_FAILURE = '[Users] Update Active Status Failure';

  static readonly LOAD_USER = '[Users] Load User';
  static readonly LOAD_USER_SUCCESS = '[Users] Load User Success';
  static readonly LOAD_USER_FAILURE = '[Users] Load User Failure';

  static readonly UPDATE_USER = '[Users] Update User';
  static readonly UPDATE_USER_SUCCESS = '[Users] Update User Success';
  static readonly UPDATE_USER_FAILURE = '[Users] Update User Failure';

  static readonly UPDATE_USER_PASSWORD = '[Users] Update User Password';
  static readonly UPDATE_USER_PASSWORD_SUCCESS = '[Users] Update User Password Success';
  static readonly UPDATE_USER_PASSWORD_FAILURE = '[Users] Update User Password Failure';

  loadUsers(): ActionWithPayload<IUsersPayload> {
    return createTypedAction<IUsersPayload>(UsersActions.LOAD_USERS, {});
  }

  loadUsersSuccess(users: IUser[]): ActionWithPayload<IUsersPayload> {
    return createTypedAction<IUsersPayload>(UsersActions.LOAD_USERS_SUCCESS, {
      users: users
    });
  }

  loadUsersFailure(errorCode: number): ActionWithPayload<IUsersPayload> {
    return createTypedAction<IUsersPayload>(UsersActions.LOAD_USERS_SUCCESS, {
      errorCode: errorCode
    });
  }

  updateActiveStatus(status: ActiveStatus, userId: number): ActionWithPayload<IUsersPayload> {
    return createTypedAction<IUsersPayload>(UsersActions.UPDATE_ACTIVE_STATUS, {
      activeStatus: status,
      userId: userId
    });
  }

  updateActiveStatusSuccess(user: IUser): ActionWithPayload<IUsersPayload> {
    return createTypedAction<IUsersPayload>(UsersActions.UPDATE_ACTIVE_STATUS_SUCCESS, {
      user: user
    });
  }

  updateActiveStatusFailure(errorCode: number): ActionWithPayload<IUsersPayload> {
    return createTypedAction<IUsersPayload>(UsersActions.UPDATE_ACTIVE_STATUS_FAILURE, {
      errorCode: errorCode
    });
  }

  loadUser(userId: number): ActionWithPayload<IUsersPayload> {
    return createTypedAction<IUsersPayload>(UsersActions.LOAD_USER, {
      userId: userId
    });
  }

  loadUserSuccess(user: IUser): ActionWithPayload<IUsersPayload> {
    return createTypedAction<IUsersPayload>(UsersActions.LOAD_USER_SUCCESS, {
      user: user
    });
  }

  loadUserFailure(errorCode: number): ActionWithPayload<IUsersPayload> {
    return createTypedAction<IUsersPayload>(UsersActions.LOAD_USER_FAILURE, {
      errorCode: errorCode
    });
  }

  updateUser(user: IUser): ActionWithPayload<IUsersPayload> {
    return createTypedAction<IUsersPayload>(UsersActions.UPDATE_USER, {
      user: user
    });
  }

  updateUserSuccess(user: IUser): ActionWithPayload<IUsersPayload> {
    return createTypedAction<IUsersPayload>(UsersActions.UPDATE_USER_SUCCESS, {
      user: user
    });
  }

  updateUserFailure(errorCode: number): ActionWithPayload<IUsersPayload> {
    return createTypedAction<IUsersPayload>(UsersActions.UPDATE_USER_FAILURE, {
      errorCode: errorCode
    });
  }

  updateUserPassword(userId: number, updateUserPasswordView: IUpdateUserPasswordView): ActionWithPayload<IUsersPayload> {
    return createTypedAction<IUsersPayload>(UsersActions.UPDATE_USER_PASSWORD, {
      userId: userId,
      updateUserPasswordView: updateUserPasswordView
    });
  }

  updateUserPasswordSuccess(): ActionWithPayload<IUsersPayload> {
    return createTypedAction<IUsersPayload>(UsersActions.UPDATE_USER_PASSWORD_SUCCESS, {});
  }

  updateUserPasswordFailure(errorCode: number): ActionWithPayload<IUsersPayload> {
    return createTypedAction<IUsersPayload>(UsersActions.UPDATE_USER_PASSWORD_FAILURE, {
      errorCode: errorCode
    });
  }
}

export interface IUsersPayload {
  users?: any[];
  user?: IUser;
  activeStatus?: ActiveStatus;
  userId?: number;
  errorCode?: number;
  updateUserPasswordView?: IUpdateUserPasswordView;
}
