import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {State} from '../../../../app.reducers';
import {CompetitionsActions} from '../../actions';
import {Observable} from 'rxjs';
import {ICompetition} from '../../models/competitions.models';
import {select, Store} from '@ngrx/store';
import {getFutureCompetitionsSelector, getLastCompetitionsSelector} from '../../reducers/competitions.selector';
import {UserRole} from '../../../../shared/permissions/models/permission.models';
import {IPageResponse} from '../../../../shared/general/general.models';
import {PageLoadInfo} from '../../../../shared/paginator/model';

@Component({
  selector: 'app-competitions-page',
  templateUrl: './competitions-page.component.html',
  styleUrls: ['./competitions-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CompetitionsPageComponent implements OnInit {

  futureCompetitions$: Observable<IPageResponse<ICompetition>>;
  lastCompetitions$: Observable<IPageResponse<ICompetition>>;
  canManageRegistrationStatus = false;

  _futureCompetitionsPage = 0;
  _lastCompetitionsPage = 0;

  constructor(private store: Store<State>,
              private competitionsActions: CompetitionsActions) {
  }

  ngOnInit() {
    this.canManageRegistrationStatus = JSON.parse(localStorage.getItem('user')).userRole as UserRole === UserRole.ADMIN;

    this.futureCompetitions$ = this.store.pipe(select(getFutureCompetitionsSelector));
    this.lastCompetitions$ = this.store.pipe(select(getLastCompetitionsSelector));

    this.loadCompetitions();
  }

  private loadCompetitions() {
    this.store.dispatch(this.competitionsActions.loadCompetitions(this._futureCompetitionsPage, this._lastCompetitionsPage));
  }

  onChangeFutureCompetitionsPage(pageLoadInfo: PageLoadInfo): void {
    this._futureCompetitionsPage = pageLoadInfo.pageNumber - 1;
    this.loadCompetitions();
  }

  onChangeLastCompetitionsPage(pageLoadInfo: PageLoadInfo): void {
    this._lastCompetitionsPage = pageLoadInfo.pageNumber - 1;
    this.loadCompetitions();
  }
}
