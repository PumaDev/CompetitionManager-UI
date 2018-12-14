import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { State } from '../../../../app.reducers';
import { CompetitionsActions } from '../../actions';
import { Observable } from 'rxjs';
import { ICompetition } from '../../models/competitions.models';
import { select, Store } from '@ngrx/store';
import { getFutureCompetitionsSelector, getLastCompetitionsSelector } from '../../reducers/competitions.selector';
import { UserRole } from '../../../../shared/permissions/models/permission.models';

@Component({
  selector: 'app-competitions-page',
  templateUrl: './competitions-page.component.html',
  styleUrls: ['./competitions-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CompetitionsPageComponent implements OnInit {

  futureCompetitions$: Observable<ICompetition[]>;
  lastCompetitions$: Observable<ICompetition[]>;
  canManageRegistrationStatus: boolean = false;

  private _futureCompetitionsPage = 0;
  private _lastCompetitionsPage = 0;

  constructor(private store: Store<State>,
              private competitionsActions: CompetitionsActions) {
  }

  ngOnInit() {
    this.canManageRegistrationStatus = JSON.parse(sessionStorage.getItem('user')).userRole as UserRole === UserRole.ADMIN;

    this.futureCompetitions$ = this.store.pipe(select(getFutureCompetitionsSelector));
    this.lastCompetitions$ = this.store.pipe(select(getLastCompetitionsSelector));

    this.loadCompetitions();
  }

  private loadCompetitions() {
    this.store.dispatch(this.competitionsActions.loadCompetitions(this._futureCompetitionsPage, this._lastCompetitionsPage));
  }

  setCompetitionStatus(competition: ICompetition) {
    this.store.dispatch(this.competitionsActions.setRegistrationStatus(competition.id, competition.registrationStatus));
  }

}
