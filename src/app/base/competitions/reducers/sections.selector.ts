import { createSelector, MemoizedSelector, Selector } from '@ngrx/store';
import { State } from '../../../app.reducers';
import { ISectionsState } from './section.reducer';

const sectionsSelector: Selector<State, ISectionsState> = (state: State) => state.sectionsReducer;

export const getSectionsSelector: MemoizedSelector<State, string[]> = createSelector(
  sectionsSelector,
  (state: ISectionsState) => state.sections
);
