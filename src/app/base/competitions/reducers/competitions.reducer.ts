import { ICompetition } from '../models/competitions.models';
import { ActionWithPayload, deepCloneMerge } from '../../../shared/utils/redux.utils';
import { CompetitionsActions } from '../actions';
import { ICompetitionPayload } from '../actions/competitions.actions';
import { ActionState } from '../../../shared/general/general.models';

export interface ICompetitionsState {
  competition: ICompetition;
  futureCompetitions: ICompetition[];
  lastCompetitions: ICompetition[];
  state: ActionState;
  loadCount: number;
}

export const competitionsInitState: ICompetitionsState = {
  competition: null,
  futureCompetitions: [],
  lastCompetitions: [],
  state: ActionState.INITIAL,
  loadCount: 0
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
        futureCompetitions: action.payload.competitions,
        loadCount: loadCount,
        state: getNextStatus(loadCount)
      });

    case CompetitionsActions.LOAD_LAST_COMPETITIONS_SUCCESS:
      loadCount = state.loadCount + 1;
      return deepCloneMerge(state, {
        lastCompetitions: action.payload.competitions,
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
        futureCompetitions: updateCompetitionInList(action.payload.competition, state.futureCompetitions),
        lastCompetitions: updateCompetitionInList(action.payload.competition, state.lastCompetitions),
        state: ActionState.SUCCEEDED
      });

    case CompetitionsActions.SET_REGISTRATION_STATUS_FAILURE:
      return deepCloneMerge(state, {
        errorCode: action.payload.errorCode,
        status: ActionState.FAILED
      });
    default:
      return state;
  }
}

function getNextStatus(loadCount): ActionState {
  return loadCount === 2 ? ActionState.SUCCEEDED : ActionState.IN_PROGRESS;
}

function updateCompetitionInList(newCompetition: ICompetition, list: ICompetition[]): ICompetition[] {
  const index = list.findIndex((c) => c.id === newCompetition.id);
  if (index >= 0) {
    const newList: ICompetition[] = deepCloneMerge(list);
    newList[index] = newCompetition;

    return newList;
  } else {
    return list;
  }
}
