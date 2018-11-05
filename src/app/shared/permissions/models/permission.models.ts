export enum UserRole {
  COACH = 'COACH',
  ADMIN = 'ADMIN',
  DEVELOPER = 'DEVELOPER'
}

export interface IAccessToken {
  token: string;
  expiresIn: Date;
}


export interface IUser {
  id: number;
  login: string;
  mail: string;
  clubName: string;
  userRole: UserRole;
}
