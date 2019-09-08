import { createSelector, MemoizedSelector, Selector } from '@ngrx/store';
import { IUsersState } from '../reducers/users.reducer';
import { State } from '../../../app.reducers';
import { IUser } from '../models/users.model';
import { ActionState } from '../../../shared/general/general.models';

const usersSelector: Selector<State, IUsersState> = (state: State) => state.usersReducer;

export const getUsersSelector: MemoizedSelector<State, IUser[]> = createSelector(
  usersSelector,
  (state: IUsersState) => state.users
);

export const getUsersErrorCodeSelector: MemoizedSelector<State, number> = createSelector(
  usersSelector,
  (state: IUsersState) => state.errorCode
);

export const getUsersActionStateSelector: MemoizedSelector<State, ActionState> = createSelector(
  usersSelector,
  (state: IUsersState) => state.state
);

export const getUserSelector: MemoizedSelector<State, IUser> = createSelector(
  usersSelector,
  (state: IUsersState) => state.user
);
