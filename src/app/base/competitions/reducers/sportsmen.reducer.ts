import { ISportsman } from '../models/sportmen.models';
import { ActionState } from '../../../shared/general/general.models';
import { ActionWithPayload, deepCloneMerge } from '../../../shared/utils/redux.utils';
import { ISportsmenPayload, SportsmenActions } from '../actions/sportsmen.actions';

export interface ISportsmenState {
  sportsmen: ISportsman[];
  loadSportsmenState: ActionState;
  createSportsmanState: ActionState;
  deleteSportsmanState: ActionState;
  errorCode: number;
}

const initSportsmenState: ISportsmenState = {
  sportsmen: [],
  loadSportsmenState: ActionState.INITIAL,
  createSportsmanState: ActionState.INITIAL,
  deleteSportsmanState: ActionState.INITIAL,
  errorCode: 0
};

export function sportsmenReducer(
  state: ISportsmenState = initSportsmenState,
  action: ActionWithPayload<ISportsmenPayload>
): ISportsmenState {
  switch (action.type) {
    case SportsmenActions.LOAD_SPORTSMEN_BY_COMPETITION:
      return deepCloneMerge(state, {
        sportsmen: [],
        loadSportsmenState: ActionState.IN_PROGRESS
      });
    case SportsmenActions.LOAD_SPORTSMEN_BY_COMPETITION_SUCCESS:
      return deepCloneMerge(state, {
        sportsmen: action.payload.sportsmen,
        loadSportsmenState: ActionState.SUCCEEDED
      });
    case SportsmenActions.LOAD_SPORTSMEN_BY_COMPETITION_FAILURE:
      return deepCloneMerge(state, {
        errorCode: action.payload.errorCode,
        loadSportsmenState: ActionState.FAILED
      });
    case SportsmenActions.ADD_SPORTSMAN_TO_COMPETITION:
      return deepCloneMerge(state, {
        createSportsmanState: ActionState.IN_PROGRESS
      });
    case SportsmenActions.ADD_SPORTSMAN_TO_COMPETITION_SUCCESS:
      return deepCloneMerge(state, {
        sportsmen: [...state.sportsmen, action.payload.sportsman],
        createSportsmanState: ActionState.SUCCEEDED
      });
    case SportsmenActions.ADD_SPORTSMAN_TO_COMPETITION_FAILURE:
      return deepCloneMerge(state, {
        errorCode: action.payload.errorCode,
        createSportsmanState: ActionState.FAILED
      });
    case SportsmenActions.DELETE_SPORTSMAN:
      return deepCloneMerge(state, {
        deleteSportsmanState: ActionState.IN_PROGRESS
      });
    case SportsmenActions.DELETE_SPORTSMAN_SUCCESS:
      return deepCloneMerge(state, {
        sportsmen: state.sportsmen.filter( (sp) => sp.id !== action.payload.sportsmanId),
        deleteSportsmanState: ActionState.SUCCEEDED
      });
    case SportsmenActions.DELETE_SPORTSMAN_FAILURE:
      return deepCloneMerge(state, {
        errorCode: action.payload.errorCode,
        deleteSportsmanState: ActionState.FAILED
      });
    default:
      return state;
  }
}


