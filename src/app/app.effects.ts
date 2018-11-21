import { CompetitionCategoriesEffects, CompetitionsEffects } from './base/competitions/effects';
import { AuthEffects } from './auth/actions/auth.effects';

export const appEffects: any[] = [
  CompetitionsEffects,
  CompetitionCategoriesEffects,
  AuthEffects
];
