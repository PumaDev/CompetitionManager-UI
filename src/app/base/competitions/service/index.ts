import { CompetitionCategoriesService } from './categories.service';
import { CompetitionsService } from './competitions.service';
import { SportsmenService } from './sportsmen.service';
import { SectionsService } from './sections.service';

export {
  CompetitionCategoriesService,
  CompetitionsService,
  SportsmenService,
  SectionsService
};

export const competitionServices = [
  CompetitionCategoriesService,
  CompetitionsService,
  SportsmenService,
  SectionsService
];
