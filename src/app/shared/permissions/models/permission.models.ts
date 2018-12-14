export enum UserRole {
  COACH = 'COACH',
  ADMIN = 'ADMIN',
  DEVELOPER = 'DEVELOPER'
}

export enum ActivateStatus {
  ACTIVE = 'ACTIVE',
  WAITING_APPROVE = 'WAITING_APPROVE',
  BANNED = 'BANNED',
  BLOCKED = 'BLOCKED'
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
  activateStatus: ActivateStatus;
}
