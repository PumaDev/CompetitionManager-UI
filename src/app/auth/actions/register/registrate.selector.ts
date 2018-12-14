import { createSelector, Selector } from '@ngrx/store';
import { IRegistrationState } from './registration.reducer';
import { State } from '../../../app.reducers';
import { IUser } from '../../../shared/permissions/models/permission.models';
import { ActionState } from '../../../shared/general/general.models';

const registrateSelector: Selector<State, IRegistrationState> = (state: State) => state.registrationReducer;

export const getCreatedUserSelector: Selector<State, IUser> = createSelector(
  registrateSelector,
  (state: IRegistrationState) => state.createdUser
);

export const getErrorCodeOfUserCreationSelector: Selector<State, number> = createSelector(
  registrateSelector,
  (state: IRegistrationState) => state.errorCode
);

export const getActionStateOfUserCreationSelector: Selector<State, ActionState> = createSelector(
  registrateSelector,
  (state: IRegistrationState) => state.state
);
