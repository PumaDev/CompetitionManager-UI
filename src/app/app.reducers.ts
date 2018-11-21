import { ActionReducerMap } from '@ngrx/store';
import { competitionsReducer, ICompetitionsState } from './base/competitions/reducers';
import { authReducer, IAuthState } from './auth/actions/auth.reducer';
import { competitionCategoriesReducer, ICompetitionCategoriesState } from './base/competitions/reducers/categories.reducer';

export interface State {
  competitionsReducer: ICompetitionsState;
  competitionCategoriesReducer: ICompetitionCategoriesState;
  authReducer: IAuthState;
}

export const reducers: ActionReducerMap<State> = {
  competitionsReducer: competitionsReducer,
  competitionCategoriesReducer: competitionCategoriesReducer,
  authReducer: authReducer
};
