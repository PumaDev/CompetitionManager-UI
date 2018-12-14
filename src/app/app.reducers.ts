import { ActionReducerMap } from '@ngrx/store';
import { competitionsReducer, ICompetitionsState } from './base/competitions/reducers';
import { authReducer, IAuthState } from './auth/actions/auth.reducer';
import { competitionCategoriesReducer, ICompetitionCategoriesState } from './base/competitions/reducers/categories.reducer';
import { IRegistrationState, registrationReducer } from './auth/actions/register/registration.reducer';
import { ISportsmenState, sportsmenReducer } from './base/competitions/reducers/sportsmen.reducer';
import { IUsersState, usersReducer } from './base/users/reducers/users.reducer';

export interface State {
  competitionsReducer: ICompetitionsState;
  competitionCategoriesReducer: ICompetitionCategoriesState;
  authReducer: IAuthState;
  registrationReducer: IRegistrationState;
  sportsmenReducer: ISportsmenState;
  usersReducer: IUsersState;
}

export const reducers: ActionReducerMap<State> = {
  competitionsReducer: competitionsReducer,
  competitionCategoriesReducer: competitionCategoriesReducer,
  authReducer: authReducer,
  registrationReducer: registrationReducer,
  sportsmenReducer: sportsmenReducer,
  usersReducer: usersReducer
};
