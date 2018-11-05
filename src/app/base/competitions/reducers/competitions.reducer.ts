import { ICompetition } from '../models/competitions.models';
import { ActionWithPayload, deepCloneMerge } from '../../../shared/utils/redux.utils';
import { CompetitionsActions } from '../actions';
import { ICompetitionPayload } from '../actions/competitions.actions';
import { ActionState } from '../../../shared/general/general.models';

export interface ICompetitionsState {
  futureCompetitions: ICompetition[];
  lastCompetitions: ICompetition[];
  state: ActionState;
  loadCount: number;
}

export const competitionsInitState: ICompetitionsState = {
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

      default:
      return state;
  }
}

function getNextStatus(loadCount): ActionState {
  return loadCount === 2 ? ActionState.SUCCEEDED : ActionState.IN_PROGRESS;
}
