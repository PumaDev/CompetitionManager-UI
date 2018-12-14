import { Injectable } from '@angular/core';
import { ISportsman } from '../models/sportmen.models';
import { ActionWithPayload, createTypedAction } from '../../../shared/utils/redux.utils';

@Injectable()
export class SportsmenActions {

  static readonly ADD_SPORTSMAN_TO_COMPETITION = '[Sportsmen Actions] Add Sportsman To Competition';
  static readonly ADD_SPORTSMAN_TO_COMPETITION_SUCCESS = '[Sportsmen Actions] Add Sportsman To Competition Success';
  static readonly ADD_SPORTSMAN_TO_COMPETITION_FAILURE = '[Sportsmen Actions] Add Sportsman To Competition Failure';

  static readonly LOAD_SPORTSMEN_BY_COMPETITION = '[Sportsmen Actions] Load Sportsmen By Competition';
  static readonly LOAD_SPORTSMEN_BY_COMPETITION_SUCCESS = '[Sportsmen Actions] Load Sportsmen By Competition Success';
  static readonly LOAD_SPORTSMEN_BY_COMPETITION_FAILURE = '[Sportsmen Actions] Load Sportsmen By Competition Failure';

  static readonly DELETE_SPORTSMAN = '[Sportsmen Actions] Delete Sportsman';
  static readonly DELETE_SPORTSMAN_SUCCESS = '[Sportsmen Actions] Delete Sportsman Success';
  static readonly DELETE_SPORTSMAN_FAILURE = '[Sportsmen Actions] Delete Sportsman Failure';

  addSportsmanToCompetition(competitionId: number, sportsman: ISportsman): ActionWithPayload<ISportsmenPayload> {
    return createTypedAction(SportsmenActions.ADD_SPORTSMAN_TO_COMPETITION, {
      competitionId: competitionId,
      sportsman: sportsman
    });
  }

  addSportsmanToCompetitionSuccess(sportsman: ISportsman): ActionWithPayload<ISportsmenPayload> {
    return createTypedAction(SportsmenActions.ADD_SPORTSMAN_TO_COMPETITION_SUCCESS, {
      sportsman: sportsman
    });
  }

  addSportsmanToCompetitionFailure(errorCode: number): ActionWithPayload<ISportsmenPayload> {
    return createTypedAction(SportsmenActions.ADD_SPORTSMAN_TO_COMPETITION_FAILURE, {
      errorCode: errorCode
    });
  }

  loadSportsmenByCompetition(competitionId: number): ActionWithPayload<ISportsmenPayload> {
    return createTypedAction(SportsmenActions.LOAD_SPORTSMEN_BY_COMPETITION, {
      competitionId: competitionId
    });
  }

  loadSportsmenByCompetitionSuccess(sportsmen: ISportsman[]): ActionWithPayload<ISportsmenPayload> {
   return createTypedAction(SportsmenActions.LOAD_SPORTSMEN_BY_COMPETITION_SUCCESS, {
     sportsmen: sportsmen
   });
  }

  loadSportsmenByCompetitionFailure(errorCode: number): ActionWithPayload<ISportsmenPayload> {
    return createTypedAction(SportsmenActions.LOAD_SPORTSMEN_BY_COMPETITION_FAILURE, {
      errorCode: errorCode
    });
  }

  deleteSportsman(sportsmanId: number): ActionWithPayload<ISportsmenPayload> {
    return createTypedAction(SportsmenActions.DELETE_SPORTSMAN, {
      sportsmanId: sportsmanId
    });
  }

  deleteSportsmanSuccess(sportsmanId: number): ActionWithPayload<ISportsmenPayload> {
    return createTypedAction(SportsmenActions.DELETE_SPORTSMAN_SUCCESS, {
      sportsmanId: sportsmanId
    });
  }

  deleteSportsmanFailure(errorCode: number): ActionWithPayload<ISportsmenPayload> {
    return createTypedAction(SportsmenActions.DELETE_SPORTSMAN_FAILURE, {
      errorCode: errorCode
    });
  }
}

export interface ISportsmenPayload {
  competitionId?: number;
  sportsmanId?: number;
  sportsman?: ISportsman;
  sportsmen?: ISportsman[];
  errorCode?: number;
}


