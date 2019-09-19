import { competitionActions } from './competitions/actions';
import { usersActions } from './users/actions';
import {mailTemplatesActions} from './mail-templates/actions';

export const baseActions = [
  ...competitionActions,
  ...usersActions,
  ...mailTemplatesActions
];
