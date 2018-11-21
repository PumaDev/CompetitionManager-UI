import { appConfig } from '../../../app.config';

export const competitionsConfig = {
  futureCompetitionsEndpoint: appConfig.host + 'competitions/future',
  lastCompetitionsEndpoint: appConfig.host + 'competitions/last',
  createCompetitionEndpoint: appConfig.host + 'competition',
  categoriesEndpoint: appConfig.host + 'competition-category'
};
