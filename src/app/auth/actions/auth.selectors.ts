import { createSelector, MemoizedSelector, Selector } from '@ngrx/store';
import { State } from '../../app.reducers';
import { AccessTokenWithUser } from '../access-token.model';
import { IAuthState } from './auth.reducer';

const authSelector: Selector<State, IAuthState> = (state: State): IAuthState => state.authReducer;

export const accessTokenWithUserSelector: MemoizedSelector<State, AccessTokenWithUser> = createSelector(
  authSelector,
  (state: IAuthState) => state.accessTokenWithUser
);

export const getLoginErrorCodeSelector: MemoizedSelector<State, number> = createSelector(
  authSelector,
  (state: IAuthState) => state.errorCode
);
