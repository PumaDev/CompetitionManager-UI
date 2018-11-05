import { ActionReducerMap } from '@ngrx/store';
import { competitionsReducer, ICompetitionsState } from './base/competitions/reducers';
import { authReducer, IAuthState } from './auth/actions/auth.reducer';

export interface State {
  competitionsReducer: ICompetitionsState;
  authReducer: IAuthState;
}

export const reducers: ActionReducerMap<State> = {
  competitionsReducer: competitionsReducer,
  authReducer: authReducer
};
