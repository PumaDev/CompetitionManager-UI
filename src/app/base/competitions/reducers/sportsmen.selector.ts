import { State } from '../../../app.reducers';
import { createSelector, MemoizedSelector, Selector } from '@ngrx/store';
import { ISportsmenState } from './sportsmen.reducer';
import { ISportsman } from '../models/sportmen.models';
import { ActionState } from '../../../shared/general/general.models';

const sportsmenSelector: Selector<State, ISportsmenState> = (state: State) => state.sportsmenReducer;

export const getSportsmenSelector: MemoizedSelector<State, ISportsman[]> = createSelector(
  sportsmenSelector,
  (state: ISportsmenState) => state.sportsmen
);

export const getLoadSportsmenActionStateSelector: MemoizedSelector<State, ActionState>  = createSelector(
  sportsmenSelector,
  (state: ISportsmenState) => state.loadSportsmenState
);

export const getAddSportsmenActionStateSelector: MemoizedSelector<State, ActionState>  = createSelector(
  sportsmenSelector,
  (state: ISportsmenState) => state.createSportsmanState
);

export const getDeleteSportsmenActionStateSelector: MemoizedSelector<State, ActionState>  = createSelector(
  sportsmenSelector,
  (state: ISportsmenState) => state.deleteSportsmanState
);

export const getSportsmenErrorCodeSelector: MemoizedSelector<State, number> = createSelector(
  sportsmenSelector,
  (state: ISportsmenState) => state.errorCode
);
