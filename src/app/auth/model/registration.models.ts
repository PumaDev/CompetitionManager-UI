import { IUser } from '../../shared/permissions/models/permission.models';

export interface ICreateUserView {
  login: string;
  mail: string;
  password: string;
  clubName: string;
}

export class CreateUserView implements ICreateUserView {
  login: string;
  mail: string;
  password: string;
  clubName: string;
}

export interface RegistrationResponse {
  success: boolean;
  errorCode: number;
  createdUser: IUser;
}
