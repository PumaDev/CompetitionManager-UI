import { Routes } from '@angular/router';
import { CompetitionsPageComponent } from './components/competitions-page/competitions-page.component';
import { NewCompetitionCanActivate } from './security/new-competition.can-activate';
import { NewCompetitionSmartComponent } from './components/new-competition/new-competition.smart.component';
import { CategoriesManagerComponent } from './components/categories-manager/categories-manager.component';
import { AdminAndDeveloperCanActivate } from '../../auth/can-activate/admin-and-developer.can-activate';
import { CompetitionPageComponent } from './components/competition-page/competition-page.component';

export const competitionRoutes: Routes = [
  {
    path: '',
    redirectTo: 'competitions',
    pathMatch: 'full'
  },
  {
    path: 'competitions',
    component: CompetitionsPageComponent
  },
  {
    path: 'competition/new',
    component: NewCompetitionSmartComponent,
    canActivate: [NewCompetitionCanActivate]
  },
  {
    path: 'competition/:competitionId',
    component: CompetitionPageComponent,
  },
  {
    path: 'competition-categories',
    component: CategoriesManagerComponent,
    canActivate: [AdminAndDeveloperCanActivate]
  }
];
