import {Injectable} from '@angular/core';
import {ActionWithPayload, createTypedAction} from '../../../shared/utils/redux.utils';
import {GeneratedCompetitionGrid, ICompetition, RegistrationStatus} from '../models/competitions.models';
import {IPageResponse} from '../../../shared/general/general.models';

@Injectable()
export class CompetitionsActions {

  static LOAD_COMPETITIONS = '[Competition] Load Competitions';
  static LOAD_FUTURE_COMPETITIONS_SUCCESS = '[Competition] Load Future Competitions';
  static LOAD_LAST_COMPETITIONS_SUCCESS = '[Competition] Load Last Competitions';
  static LOAD_COMPETITIONS_FAILURE = '[Competition] Load Competitions Failure';

  static CREATE_COMPETITION = '[Competition] Create Competition';
  static CREATE_COMPETITION_SUCCESS = '[Competition] Create Competition Success';
  static CREATE_COMPETITION_FAILURE = '[Competition] Create Competition Failure';
  static CLEAR_CREATE_STATE = '[Competition] Clear Create State';

  static LOAD_COMPETITION = '[Competition] Load Competition';
  static LOAD_COMPETITION_SUCCESS = '[Competition] Load Competition Success';
  static LOAD_COMPETITION_FAILURE = '[Competition] Load Competition Failure';

  static SET_REGISTRATION_STATUS = '[Competition] Set Registration Statue';
  static SET_REGISTRATION_STATUS_FAILURE = '[Competition] Set Registration Statue Success';
  static SET_REGISTRATION_STATUS_SUCCESS = '[Competition] Set Registration Statue Failure';

  static GENERATE_GRID = '[Competition] Generate Grid';
  static GENERATE_GRID_SUCCESS = '[Competition] Generate Grid Success';
  static GENERATE_GRID_FAILURE = '[Competition] Generate Grid Failure';

  static DELETE_COMPETITION = '[Competition] Delete Competition';
  static DELETE_COMPETITION_SUCCESS = '[Competition] Delete Competition Success';
  static DELETE_COMPETITION_FAILURE = '[Competition] Delete Competition Failure';

  static UPDATE_COMPETITION = '[Competition] Update Competition';
  static UPDATE_COMPETITION_SUCCESS = '[Competition] Update Competition Success';
  static UPDATE_COMPETITION_FAILURE = '[Competition] Update Competition Failure';

  loadCompetitions(futureCompetitionsPage: number,
                   lastCompetitionsPage: number): ActionWithPayload<ICompetitionPayload> {
    return createTypedAction<ICompetitionPayload>(CompetitionsActions.LOAD_COMPETITIONS, {
      futureCompetitionsPage: futureCompetitionsPage,
      lastCompetitionsPage: lastCompetitionsPage
    });
  }

  loadFutureCompetitionsSuccess(competitionsPage: IPageResponse<ICompetition>): ActionWithPayload<ICompetitionPayload> {
    return createTypedAction<ICompetitionPayload>(CompetitionsActions.LOAD_FUTURE_COMPETITIONS_SUCCESS, {competitionsPage: competitionsPage});
  }

  loadLastCompetitionsSuccess(competitionsPage: IPageResponse<ICompetition>): ActionWithPayload<ICompetitionPayload> {
    return createTypedAction<ICompetitionPayload>(CompetitionsActions.LOAD_LAST_COMPETITIONS_SUCCESS, {competitionsPage: competitionsPage});
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

  clearCreateState(): ActionWithPayload<ICompetitionPayload> {
    return createTypedAction<ICompetitionPayload>(CompetitionsActions.CLEAR_CREATE_STATE, {});
  }

  loadCompetition(competitionId: number): ActionWithPayload<ICompetitionPayload> {
    return createTypedAction<ICompetitionPayload>(CompetitionsActions.LOAD_COMPETITION, {
      competitionId: competitionId
    });
  }

  loadCompetitionSuccess(competition: ICompetition): ActionWithPayload<ICompetitionPayload> {
    return createTypedAction<ICompetitionPayload>(CompetitionsActions.LOAD_COMPETITION_SUCCESS, {
      competition: competition
    });
  }

  loadCompetitionFailure(): ActionWithPayload<ICompetitionPayload> {
    return createTypedAction<ICompetitionPayload>(CompetitionsActions.LOAD_COMPETITION_FAILURE, {});
  }

  setRegistrationStatus(competitionId: number, registrationStatus: RegistrationStatus): ActionWithPayload<ICompetitionPayload> {
    return createTypedAction<ICompetitionPayload>(CompetitionsActions.SET_REGISTRATION_STATUS, {
      competitionId: competitionId,
      registrationStatus: registrationStatus
    });
  }

  setRegistrationStatusSuccess(competition: ICompetition) {
    return createTypedAction<ICompetitionPayload>(CompetitionsActions.SET_REGISTRATION_STATUS_SUCCESS, {
      competition: competition
    });
  }

  setRegistrationStatusFailed(errorCode: number) {
    return createTypedAction<ICompetitionPayload>(CompetitionsActions.SET_REGISTRATION_STATUS_FAILURE, {
      errorCode: errorCode
    });
  }

  generateGrid(competitionId: number): ActionWithPayload<ICompetitionPayload> {
    return createTypedAction<ICompetitionPayload>(CompetitionsActions.GENERATE_GRID, {
      competitionId: competitionId
    });
  }

  generateGridSuccess(generatedCompetitionGrid: GeneratedCompetitionGrid): ActionWithPayload<ICompetitionPayload> {
    return createTypedAction<ICompetitionPayload>(CompetitionsActions.GENERATE_GRID_SUCCESS, {
      generatedCompetitionGrid: generatedCompetitionGrid
    });
  }

  generateGridFaulure(errorCode: number): ActionWithPayload<ICompetitionPayload> {
    return createTypedAction<ICompetitionPayload>(CompetitionsActions.GENERATE_GRID_FAILURE, {
      errorCode: errorCode
    });
  }

  deleteCompetition(competitionId: number): ActionWithPayload<ICompetitionPayload> {
    return createTypedAction<ICompetitionPayload>(CompetitionsActions.DELETE_COMPETITION, {
      competitionId: competitionId
    });
  }

  deleteCompetitionSuccess(): ActionWithPayload<ICompetitionPayload> {
    return createTypedAction<ICompetitionPayload>(CompetitionsActions.DELETE_COMPETITION_SUCCESS, {});
  }

  deleteCompetitionFaulure(errorCode: number): ActionWithPayload<ICompetitionPayload> {
    return createTypedAction<ICompetitionPayload>(CompetitionsActions.DELETE_COMPETITION_FAILURE, {
      errorCode: errorCode
    });
  }

  updateCompetition(competitionForUpdate: ICompetition): ActionWithPayload<ICompetitionPayload> {
    return createTypedAction<ICompetitionPayload>(CompetitionsActions.UPDATE_COMPETITION, {
      competition: competitionForUpdate
    });
  }

  updateCompetitionSuccess(updatedCompetition: ICompetition): ActionWithPayload<ICompetitionPayload> {
    return createTypedAction<ICompetitionPayload>(CompetitionsActions.UPDATE_COMPETITION_SUCCESS, {
      competition: updatedCompetition
    });
  }

  updateCompetitionFailure(errorCode: number): ActionWithPayload<ICompetitionPayload> {
    return createTypedAction<ICompetitionPayload>(CompetitionsActions.UPDATE_COMPETITION_FAILURE, {
      errorCode: errorCode
    });
  }
}

export interface ICompetitionPayload {
  registrationStatus?: RegistrationStatus;
  competitionId?: number;
  futureCompetitionsPage?: number;
  lastCompetitionsPage?: number;
  competition?: any;
  competitionsPage?: IPageResponse<ICompetition>;
  errorCode?: number;
  generatedCompetitionGrid?: GeneratedCompetitionGrid;
}
