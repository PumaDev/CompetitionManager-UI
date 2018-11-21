import { createSelector, MemoizedSelector, Selector } from '@ngrx/store';
import { ICompetition } from '../models/competitions.models';
import { State } from '../../../app.reducers';
import { ICompetitionsState } from './competitions.reducer';
import { ActionState } from '../../../shared/general/general.models';

export const competitionsSelector: Selector<State, ICompetitionsState> =
  (state: State): ICompetitionsState => state.competitionsReducer;

export const getFutureCompetitionsSelector: MemoizedSelector<State, ICompetition[]> = createSelector(
  competitionsSelector,
  (state: ICompetitionsState) => state.futureCompetitions
);

export const getLastCompetitionsSelector: MemoizedSelector<State, ICompetition[]> = createSelector(
  competitionsSelector,
  (state: ICompetitionsState) => state.lastCompetitions
);

export const getCompetitionState: MemoizedSelector<State, ActionState> = createSelector(
  competitionsSelector,
  (state: ICompetitionsState) => state.state
);
