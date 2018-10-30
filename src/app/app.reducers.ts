import { ActionReducerMap } from '@ngrx/store';
import { competitionsReducer, ICompetitionsState } from './base/competitions/reducers';

export interface State {
  competitionsReducer: ICompetitionsState;
}

export const reducers: ActionReducerMap<State> = {
  competitionsReducer: competitionsReducer
};
