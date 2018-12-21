import { CompetitionsActions } from './competitions.actions';
import { CompetitionCategoriesActions } from './categories.actions';
import { SportsmenActions } from './sportsmen.actions';
import { SectionActions } from './section.actions';

export {
  CompetitionsActions,
  CompetitionCategoriesActions,
  SportsmenActions,
  SectionActions
};

export const competitionActions = [
  CompetitionsActions,
  CompetitionCategoriesActions,
  SportsmenActions,
  SectionActions
];
