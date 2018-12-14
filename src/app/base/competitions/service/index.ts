import { CompetitionCategoriesService } from './categories.service';
import { CompetitionsService } from './competitions.service';
import { SportsmenService } from './sportsmen.service';

export {
  CompetitionCategoriesService,
  CompetitionsService,
  SportsmenService
};

export const competitionServices = [
  CompetitionCategoriesService,
  CompetitionsService,
  SportsmenService
];
