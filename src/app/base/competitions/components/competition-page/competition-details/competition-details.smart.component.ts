import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../../app.reducers';
import {CompetitionsActions} from '../../../actions';
import {
  getCompetitionSelector,
  getGeneratedCompetitionGridSelector,
  getGenerateGridStateSelector
} from '../../../reducers/competitions.selector';
import {UserRole} from '../../../../../shared/permissions/models/permission.models';
import {Observable} from 'rxjs';
import {ActionState} from '../../../../../shared/general/general.models';
import {GeneratedCompetitionGrid} from '../../../models/competitions.models';

@Component({
  selector: 'app-competition-details-smart',
  templateUrl: './competition-details.smart.component.html'
})
export class CompetitionDetailsSmartComponent implements OnInit {

  @Input() competitionId: number;

  competition$ = this.store.pipe(select(getCompetitionSelector));
  userRole: UserRole;
  generatedCompetitionGrid$: Observable<GeneratedCompetitionGrid> = this.store.pipe(select(getGeneratedCompetitionGridSelector));
  generateGridState$: Observable<ActionState> = this.store.pipe(select(getGenerateGridStateSelector));

  constructor(private store: Store<State>,
              private competitionActions: CompetitionsActions
  ) {
  }

  ngOnInit(): void {
    this.userRole = JSON.parse(sessionStorage.getItem('user')).userRole;
    this.store.dispatch(this.competitionActions.loadCompetition(this.competitionId));
  }

  onGenerateGrid(competitionId: number): void {
    this.store.dispatch(this.competitionActions.generateGrid(competitionId));
  }

  deleteCompetition(competitionId: number): void {
    this.store.dispatch(this.competitionActions.deleteCompetition(competitionId));
  }

}
