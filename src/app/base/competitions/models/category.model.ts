export interface ICompetitionCategory {
  id: number;
  section: string;
  displayName: string;

  lowerAge: number;
  upperAge: number;

  lowerWeight: number;
  upperWeight: number;

  lowerExperience: number;
  upperExperience: number;
}
