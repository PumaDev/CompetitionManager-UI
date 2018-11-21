import { Injectable } from '@angular/core';
import { ActionWithPayload, createTypedAction } from '../../../shared/utils/redux.utils';
import { ICompetition } from '../models/competitions.models';

@Injectable()
export class CompetitionsActions {

  static LOAD_COMPETITIONS = '[Competition] Load Competitions';
  static LOAD_FUTURE_COMPETITIONS_SUCCESS = '[Competition] Load Future Competitions';
  static LOAD_LAST_COMPETITIONS_SUCCESS = '[Competition] Load Last Competitions';
  static LOAD_COMPETITIONS_FAILURE = '[Competition] Load Competitions Failure';

  static CREATE_COMPETITION = '[Competition] Create Competition';
  static CREATE_COMPETITION_SUCCESS = '[Competition] Create Competition Success';
  static CREATE_COMPETITION_FAILURE = '[Competition] Create Competition Failure';

  loadCompetitions(futureCompetitionsPage: number,
                   lastCompetitionsPage: number): ActionWithPayload<ICompetitionPayload> {
    return createTypedAction<ICompetitionPayload>(CompetitionsActions.LOAD_COMPETITIONS, {
      futureCompetitionsPage: futureCompetitionsPage,
      lastCompetitionsPage: lastCompetitionsPage
    });
  }

  loadFutureCompetitionsSuccess(competitions: ICompetition[]): ActionWithPayload<ICompetitionPayload> {
    return createTypedAction<ICompetitionPayload>(CompetitionsActions.LOAD_FUTURE_COMPETITIONS_SUCCESS, {competitions: competitions});
  }

  loadLastCompetitionsSuccess(competitions: ICompetition[]): ActionWithPayload<ICompetitionPayload> {
    return createTypedAction<ICompetitionPayload>(CompetitionsActions.LOAD_LAST_COMPETITIONS_SUCCESS, {competitions: competitions});
  }

  loadCompetitionsFailure(): ActionWithPayload<ICompetitionPayload> {
    return createTypedAction<ICompetitionPayload>(CompetitionsActions.LOAD_COMPETITIONS_FAILURE, {});
  }

  createCompetition(competition: ICompetition): ActionWithPayload<ICompetitionPayload> {
    return createTypedAction<ICompetitionPayload>(CompetitionsActions.CREATE_COMPETITION, {competition: competition});
  }

  createCompetitionSuccess(): ActionWithPayload<ICompetitionPayload> {
    return createTypedAction<ICompetitionPayload>(CompetitionsActions.CREATE_COMPETITION_SUCCESS, {});
  }

  createCompetitionFailure(): ActionWithPayload<ICompetitionPayload> {
    return createTypedAction<ICompetitionPayload>(CompetitionsActions.CREATE_COMPETITION_FAILURE, {});
  }
}

export interface ICompetitionPayload {
  futureCompetitionsPage?: number;
  lastCompetitionsPage?: number;
  competition?: any;
  competitions?: any[];
  error?: any;
}
