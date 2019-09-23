import {competitionEffects} from './base/competitions/effects';
import {AuthEffects} from './auth/actions/auth.effects';
import {RegistrationEffects} from './auth/actions/register/registration.effects';
import {usersEffects} from './base/users/effects';
import {mailTemplatesEffects} from './base/mail-templates/effects';

export const appEffects: any[] = [
  ...competitionEffects,
  ...usersEffects,
  ...mailTemplatesEffects,
  AuthEffects,
  RegistrationEffects
];
