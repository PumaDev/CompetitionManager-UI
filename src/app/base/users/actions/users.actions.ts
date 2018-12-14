import { Injectable } from '@angular/core';
import { ActionWithPayload, createTypedAction } from '../../../shared/utils/redux.utils';
import { ActiveStatus, IUser } from '../models/users.model';

@Injectable()
export class UsersActions {

  static readonly LOAD_USERS = '[Users] Load Users';
  static readonly LOAD_USERS_SUCCESS = '[Users] Load Users Success';
  static readonly LOAD_USERS_FAILURE = '[Users] Load Users Failure';

  static readonly UPDATE_ACTIVE_STATUS = '[Users] Update Active Status';
  static readonly UPDATE_ACTIVE_STATUS_SUCCESS = '[Users] Update Active Status Success';
  static readonly UPDATE_ACTIVE_STATUS_FAILURE = '[Users] Update Active Status Failure';

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
}

export interface IUsersPayload {
  users?: any[];
  user?: IUser;
  activeStatus?: ActiveStatus;
  userId?: number;
  errorCode?: number;
}
