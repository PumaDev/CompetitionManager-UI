import { createSelector, MemoizedSelector, Selector } from '@ngrx/store';
import { ICompetitionCategoriesState } from './categories.reducer';
import { State } from '../../../app.reducers';
import { ICompetitionCategory } from '../models/category.model';

export const competitionCategoriesSelector: Selector<State, ICompetitionCategoriesState> =
  (state: State): ICompetitionCategoriesState => state.competitionCategoriesReducer;

export const getCompetitionCategoriesSelector: MemoizedSelector<State, ICompetitionCategory[]> = createSelector(
  competitionCategoriesSelector,
  (state: ICompetitionCategoriesState) => state.categories
);
