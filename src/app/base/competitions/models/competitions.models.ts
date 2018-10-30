export enum RegistrationStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  REOPEN = 'REOPEN'
}

export interface ICompetition {
  id: number;
  name: string;
  description: string;
  registrationStatus: RegistrationStatus;
  startDate: Date;
  endDate: Date;
}
