import { UserRole } from '../../../shared/permissions/models/permission.models';

export interface IUser {
  id: number;
  login: string;
  mail: string;
  clubName: string;
  activateStatus: ActiveStatus;
  userRole: UserRole;
}

export enum ActiveStatus {
  ACTIVE = 'ACTIVE',
  WAITING_APPROVE = 'WAITING_APPROVE',
  BLOCKED = 'BLOCKED',
  BANNED = 'BANNED'
}
