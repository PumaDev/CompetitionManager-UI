import { Injectable } from '@angular/core';
import { ICreateUserView } from '../../model/registration.models';
import { ActionWithPayload, createTypedAction } from '../../../shared/utils/redux.utils';
import { IUser } from '../../../shared/permissions/models/permission.models';

@Injectable()
export class RegistrationActions {

  static readonly REGISTRATION = '[Registration] User Registration';
  static readonly REGISTRATION_SUCCESS = '[Registration] User Registration Success';
  static readonly REGISTRATION_FAILURE = '[Registration] User Registration Failed';

  createUser(newUser: ICreateUserView): ActionWithPayload<RegistrationPayload> {
    return createTypedAction<RegistrationPayload>(RegistrationActions.REGISTRATION, {
      newUser: newUser
    });
  }

  createUserSuccess(user: IUser): ActionWithPayload<RegistrationPayload> {
    return createTypedAction<RegistrationPayload>(RegistrationActions.REGISTRATION_SUCCESS, {
      user: user
    });
  }

  createUserFailed(errorCode: number): ActionWithPayload<RegistrationPayload> {
    return createTypedAction<RegistrationPayload>(RegistrationActions.REGISTRATION_FAILURE, {
      errorCode: errorCode
    });
  }
}

export interface RegistrationPayload {
  newUser?: ICreateUserView;
  user?: IUser;
  errorCode?: any;
}
