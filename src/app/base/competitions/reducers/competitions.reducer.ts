import {GeneratedCompetitionGrid, ICompetition} from '../models/competitions.models';
import {ActionWithPayload, deepCloneMerge} from '../../../shared/utils/redux.utils';
import {CompetitionsActions} from '../actions';
import {ICompetitionPayload} from '../actions/competitions.actions';
import {ActionState, createEmptyPageResponse, IPageResponse, PageResponse} from '../../../shared/general/general.models';

export interface ICompetitionsState {
  competition: ICompetition;
  futureCompetitionsPage: IPageResponse<ICompetition>;
  lastCompetitionsPage: IPageResponse<ICompetition>;
  state: ActionState;
  loadCount: number;
  generateGridState: ActionState;
  generatedCompetitionGrid: GeneratedCompetitionGrid;
  deleteCompetitionActionState: ActionState;
  updateCompetitionActionState: ActionState;
}

export const competitionsInitState: ICompetitionsState = {
  competition: null,
  futureCompetitionsPage: createEmptyPageResponse<ICompetition>(),
  lastCompetitionsPage: createEmptyPageResponse<ICompetition>(),
  state: ActionState.INITIAL,
  loadCount: 0,
  generateGridState: ActionState.INITIAL,
  generatedCompetitionGrid: null,
  deleteCompetitionActionState: ActionState.INITIAL,
  updateCompetitionActionState: ActionState.INITIAL
};

export function competitionsReducer(
  state: ICompetitionsState = competitionsInitState,
  action: ActionWithPayload<ICompetitionPayload>
): ICompetitionsState {
  let loadCount;
  switch (action.type) {

    case CompetitionsActions.LOAD_COMPETITIONS:
      return deepCloneMerge(state, {
        loadCount: 0,
        state: ActionState.IN_PROGRESS
      });

    case CompetitionsActions.LOAD_FUTURE_COMPETITIONS_SUCCESS:
      loadCount = state.loadCount + 1;
      return deepCloneMerge(state, {
        futureCompetitionsPage: action.payload.competitionsPage,
        loadCount: loadCount,
        state: getNextStatus(loadCount)
      });

    case CompetitionsActions.LOAD_LAST_COMPETITIONS_SUCCESS:
      loadCount = state.loadCount + 1;
      return deepCloneMerge(state, {
        lastCompetitionsPage: action.payload.competitionsPage,
        loadCount: loadCount,
        state: getNextStatus(loadCount)
      });

    case CompetitionsActions.CREATE_COMPETITION:
      return deepCloneMerge(state, {
        competition: action.payload.competition,
        state: ActionState.IN_PROGRESS
      });

    case CompetitionsActions.CREATE_COMPETITION_SUCCESS:
      return deepCloneMerge(state, {
        state: ActionState.SUCCEEDED
      });

    case CompetitionsActions.CREATE_COMPETITION_FAILURE:
      return deepCloneMerge(state, {
        state: ActionState.FAILED
      });

    case CompetitionsActions.LOAD_COMPETITION:
      return deepCloneMerge(state, {
        state: ActionState.IN_PROGRESS
      });

    case CompetitionsActions.LOAD_COMPETITION_SUCCESS:
      return deepCloneMerge(state, {
        competition: action.payload.competition,
        state: ActionState.SUCCEEDED
      });

    case CompetitionsActions.LOAD_COMPETITION_FAILURE:
      return deepCloneMerge(state, {
        state: ActionState.FAILED
      });

    case CompetitionsActions.SET_REGISTRATION_STATUS:
      return deepCloneMerge(state, {
        state: ActionState.IN_PROGRESS
      });

    case CompetitionsActions.SET_REGISTRATION_STATUS_SUCCESS:
      return deepCloneMerge(state, {
        competition: action.payload.competition,
        futureCompetitionsPage: updateCompetitionInList(action.payload.competition, state.futureCompetitionsPage),
        lastCompetitionsPage: updateCompetitionInList(action.payload.competition, state.lastCompetitionsPage),
        state: ActionState.SUCCEEDED
      });

    case CompetitionsActions.SET_REGISTRATION_STATUS_FAILURE:
      return deepCloneMerge(state, {
        errorCode: action.payload.errorCode,
        status: ActionState.FAILED
      });

    case CompetitionsActions.GENERATE_GRID:
      return deepCloneMerge(state, {
        generateGridState: ActionState.IN_PROGRESS
      });

    case CompetitionsActions.GENERATE_GRID_SUCCESS:
      return deepCloneMerge(state, {
        generatedCompetitionGrid: action.payload.generatedCompetitionGrid,
        generateGridState: ActionState.SUCCEEDED
      });

    case CompetitionsActions.GENERATE_GRID_FAILURE:
      return deepCloneMerge(state, {
        errorCode: action.payload.errorCode,
        generateGridState: ActionState.FAILED
      });

    case CompetitionsActions.DELETE_COMPETITION:
      return deepCloneMerge(state, {
        deleteCompetitionActionState: ActionState.IN_PROGRESS
      });

    case CompetitionsActions.DELETE_COMPETITION_SUCCESS:
      return deepCloneMerge(state, {
        deleteCompetitionActionState: ActionState.SUCCEEDED
      });

    case CompetitionsActions.DELETE_COMPETITION_FAILURE:
      return deepCloneMerge(state, {
        deleteCompetitionActionState: ActionState.FAILED
      });

    case CompetitionsActions.UPDATE_COMPETITION:
      return deepCloneMerge(state, {
        updateCompetitionActionState: ActionState.IN_PROGRESS
      });

    case CompetitionsActions.UPDATE_COMPETITION_SUCCESS:
      return deepCloneMerge(state, {
        competition: action.payload.competition,
        updateCompetitionActionState: ActionState.SUCCEEDED
      });

    case CompetitionsActions.UPDATE_COMPETITION_FAILURE:
      return deepCloneMerge(state, {
        errorCode: action.payload.errorCode,
        updateCompetitionActionState: ActionState.FAILED
      });

    default:
      return state;
  }
}

function getNextStatus(loadCount): ActionState {
  return loadCount === 2 ? ActionState.SUCCEEDED : ActionState.IN_PROGRESS;
}

function updateCompetitionInList(newCompetition: ICompetition, pageResponse: IPageResponse<ICompetition>): IPageResponse<ICompetition> {
  const list: ICompetition[] = pageResponse.content;
  const index = list.findIndex((c) => c.id === newCompetition.id);
  if (index >= 0) {
    const newList: ICompetition[] = deepCloneMerge(list);
    newList[index] = newCompetition;

    return new PageResponse<ICompetition>(newList, pageResponse.totalPages, pageResponse.totalElements);
  } else {
    return new PageResponse<ICompetition>(list, pageResponse.totalPages, pageResponse.totalElements);
  }
}
