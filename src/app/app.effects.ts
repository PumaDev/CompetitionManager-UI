import { competitionEffects } from './base/competitions/effects';
import { AuthEffects } from './auth/actions/auth.effects';
import { RegistrationEffects } from './auth/actions/register/registration.effects';

export const appEffects: any[] = [
  ...competitionEffects,
  AuthEffects,
  RegistrationEffects
];
