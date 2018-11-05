import { IAccessToken, IUser } from '../shared/permissions/models/permission.models';

export class AccessTokenWithUser implements IAccessToken{
  token: string;
  expiresIn: Date;
  user: IUser;
}
