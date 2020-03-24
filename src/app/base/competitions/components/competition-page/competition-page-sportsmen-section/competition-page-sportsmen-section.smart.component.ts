import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../../../app.reducers';
import { SectionActions, SportsmenActions } from '../../../actions';
import { Observable } from 'rxjs';
import { ISportsman } from '../../../models/sportmen.models';
import {
  getAddSportsmenActionStateSelector,
  getDeleteSportsmenActionStateSelector,
  getLoadSportsmenActionStateSelector,
  getSportsmenErrorCodeSelector,
  getSportsmenSelector
} from '../../../reducers/sportsmen.selector';
import { ActionState } from '../../../../../shared/general/general.models';
import { getRegistrationStatusSelector } from '../../../reducers/competitions.selector';
import { RegistrationStatus } from '../../../models/competitions.models';
import { UserRole } from '../../../../../shared/permissions/models/permission.models';
import { getSectionsSelector } from '../../../reducers/sections.selector';
import { isMobileVersion } from 'src/app/shared/screen-state/mobile.state';

@Component({
  selector: 'app-competition-page-sportsmen-section-smart',
  templateUrl: './competition-page-sportsmen-section.smart.component.html'
})
export class CompetitionPageSportsmenSectionSmartComponent implements OnInit {

  @Input() competitionId: number;

  sportsmen$: Observable<ISportsman[]> = this.store.pipe(select(getSportsmenSelector));
  loadSportsmanState$: Observable<ActionState> = this.store.pipe(select(getLoadSportsmenActionStateSelector));
  addSportsmanState$: Observable<ActionState> = this.store.pipe(select(getAddSportsmenActionStateSelector));
  deleteSportsmanState$: Observable<ActionState> = this.store.pipe(select(getDeleteSportsmenActionStateSelector));
  errorCode$: Observable<number> = this.store.pipe(select(getSportsmenErrorCodeSelector));
  competitionRegistrationStatus$: Observable<RegistrationStatus> = this.store.pipe(select(getRegistrationStatusSelector));
  sections$: Observable<string[]> = this.store.pipe(select(getSectionsSelector));
  userRole: UserRole;

  constructor(private store: Store<State>,
              private sportsmanActions: SportsmenActions,
              private sectionActions: SectionActions) {
  }

  ngOnInit() {
    this.userRole = JSON.parse(localStorage.getItem('user')).userRole;
    this.store.dispatch(this.sportsmanActions.loadSportsmenByCompetition(this.competitionId));
    this.store.dispatch(this.sectionActions.loadSections());
  }

  addSportsman(sportsman: ISportsman) {
    this.store.dispatch(this.sportsmanActions.addSportsmanToCompetition(this.competitionId, sportsman));
  }

  deleteSportsman(sportsmanId: number) {
    this.store.dispatch(this.sportsmanActions.deleteSportsman(sportsmanId));
  }

  isMobile(): boolean {
    return isMobileVersion();
  }
}
