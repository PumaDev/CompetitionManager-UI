import { appConfig } from '../../../app.config';

export const competitionsConfig = {
  futureCompetitionsEndpoint: appConfig.host + 'competitions/future',
  lastCompetitionsEndpoint: appConfig.host + 'competitions/last',
  createCompetitionEndpoint: appConfig.host + 'competition',
  categoriesEndpoint: appConfig.host + 'competition-category',
  getCategoriesByCompetitionEndpoint: appConfig.host + 'competition/{competitionId}/categories',
  competitionByIdEndpoint: appConfig.host + 'competition/{id}',
  updateRegistrationStatusInCompetition: appConfig.host + 'competition/{competitionId}/registration/{registrationStatus}',
  addSportsmanEndpoint: appConfig.host + 'sportsman/register/{competitionId}',
  sportsmenByCompetition: appConfig.host + 'sportsman/find/by-competition/{competitionId}',
  deleteSportsman: appConfig.host + 'sportsman/delete/{sportsmanId}',
  sectionsEndpoint: appConfig.host + 'competition-category/sections',
  generateGrid: appConfig.host + 'competition/{competitionId}/grid/generate',
  deleteCompetition: appConfig.host + 'competition/{competitionId}',
  updateCompetition:  appConfig.host + 'competition/{competitionId}',
  addCategoriesToCompetition: appConfig.host + '/competitions/{competitionId}/attach-categories'
};
