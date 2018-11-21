import { Routes } from '@angular/router';
import { CompetitionsPageComponent } from './components/competitions-page/competitions-page.component';
import { NewCompetitionCanActivate } from './security/new-competition.can-activate';
import { NewCompetitionSmartComponent } from './components/new-competition/new-competition.smart.component';

export const competitionRoutes: Routes = [
  {
    path: 'competitions',
    component: CompetitionsPageComponent
  },
  {
    path: 'competition/new',
    component: NewCompetitionSmartComponent,
    canActivate: [NewCompetitionCanActivate]
  }
];
