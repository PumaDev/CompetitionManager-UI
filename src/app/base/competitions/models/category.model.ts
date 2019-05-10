import {Male} from './sportmen.models';

export interface ICompetitionCategory {
  id: number;
  section: string;
  male: Male;
  displayName: string;

  lowerAge: number;
  upperAge: number;

  lowerWeight: number;
  upperWeight: number;

  lowerExperience: number;
  upperExperience: number;
}
