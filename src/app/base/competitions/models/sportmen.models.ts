import { ICompetitionCategory } from './category.model';

export interface ISportsman {
  id?: number;
  name: string;
  lastName: string;
  age: number;
  weight: number;
  experience: number;
  male: Male;
  coach: string;
  competitionId: number;
  categoryId?: number;
  clubName?: string;
  competitionCategory?: ICompetitionCategory;
  section?: string;
}

export enum Male {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}
