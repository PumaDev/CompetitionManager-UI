import { ICompetitionCategory } from './category.model';

export enum RegistrationStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  REOPEN = 'REOPEN'
}

export interface ICompetition {
  id?: number;
  name: string;
  description: string;
  registrationStatus?: RegistrationStatus;
  startDate: Date | string;
  endDate: Date | string;
  categories: ICompetitionCategory[];
  competitionMeta?: CompetitionMeta;
}

export interface CompetitionMeta {
  totalCategoriesSize: number;
  minAgeCategory: number;
  maxAgeCategory: number;
  totalSportsmenCount: number;
  totalSportsmenOfCoachClubCount: number;
}
