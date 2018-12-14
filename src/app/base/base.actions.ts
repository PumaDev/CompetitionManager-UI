import { competitionActions } from './competitions/actions';
import { usersActions } from './users/actions';

export const baseActions = [
  ...competitionActions,
  ...usersActions
];
