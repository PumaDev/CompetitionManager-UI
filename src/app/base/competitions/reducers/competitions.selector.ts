import { createSelector, MemoizedSelector, Selector } from '@ngrx/store';
import {GeneratedCompetitionGrid, ICompetition, RegistrationStatus} from '../models/competitions.models';
import { State } from '../../../app.reducers';
import { ICompetitionsState } from './competitions.reducer';
import {ActionState, IPageResponse} from '../../../shared/general/general.models';
import { ICompetitionCategory } from '../models/category.model';

export const competitionsSelector: Selector<State, ICompetitionsState> =
  (state: State): ICompetitionsState => state.competitionsReducer;

export const getFutureCompetitionsSelector: MemoizedSelector<State, IPageResponse<ICompetition>> = createSelector(
  competitionsSelector,
  (state: ICompetitionsState) => state.futureCompetitionsPage
);

export const getLastCompetitionsSelector: MemoizedSelector<State, IPageResponse<ICompetition>> = createSelector(
  competitionsSelector,
  (state: ICompetitionsState) => state.lastCompetitionsPage
);

export const getCompetitionState: MemoizedSelector<State, ActionState> = createSelector(
  competitionsSelector,
  (state: ICompetitionsState) => state.state
);

export const getCompetitionSelector: MemoizedSelector<State, ICompetition> = createSelector(
  competitionsSelector,
  (state: ICompetitionsState) => state.competition
);

export const getRegistrationStatusSelector: MemoizedSelector<State, RegistrationStatus> = createSelector(
  getCompetitionSelector,
  (competition: ICompetition) => competition ? competition.registrationStatus : null
);

export const getCategoriesFromCompetitionSelector: MemoizedSelector<State, ICompetitionCategory[]> = createSelector(
  getCompetitionSelector,
  (competition: ICompetition) => competition ? competition.categories : []
);

export const getGenerateGridStateSelector: MemoizedSelector<State, ActionState> = createSelector(
  competitionsSelector,
  (state: ICompetitionsState) => state.generateGridState
);

export const getGeneratedCompetitionGridSelector: MemoizedSelector<State, GeneratedCompetitionGrid> = createSelector(
  competitionsSelector,
  (state: ICompetitionsState) => state.generatedCompetitionGrid
);

export const getUpdateCompetitionActionState: MemoizedSelector<State, ActionState> = createSelector(
  competitionsSelector,
  (state: ICompetitionsState) => state.updateCompetitionActionState
);
