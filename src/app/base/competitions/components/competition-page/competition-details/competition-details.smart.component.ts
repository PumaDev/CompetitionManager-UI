import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../../app.reducers';
import {CompetitionsActions} from '../../../actions';
import {
  getCompetitionSelector,
  getGeneratedCompetitionGridSelector,
  getGenerateGridStateSelector, getUpdateCompetitionActionState
} from '../../../reducers/competitions.selector';
import {UserRole} from '../../../../../shared/permissions/models/permission.models';
import {Observable} from 'rxjs';
import {ActionState} from '../../../../../shared/general/general.models';
import {GeneratedCompetitionGrid, ICompetition} from '../../../models/competitions.models';
import { isMobileVersion } from 'src/app/shared/screen-state/mobile.state';

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
  updateCompetitionActionState$: Observable<ActionState> = this.store.pipe(select(getUpdateCompetitionActionState));

  constructor(private store: Store<State>,
              private competitionActions: CompetitionsActions
  ) {
  }

  ngOnInit(): void {
    this.userRole = JSON.parse(localStorage.getItem('user')).userRole;
    this.store.dispatch(this.competitionActions.loadCompetition(this.competitionId));
  }

  onGenerateGrid(competitionId: number): void {
    this.store.dispatch(this.competitionActions.generateGrid(competitionId));
  }

  deleteCompetition(competitionId: number): void {
    this.store.dispatch(this.competitionActions.deleteCompetition(competitionId));
  }

  updateCompetition(competition: ICompetition): void {
    this.store.dispatch(this.competitionActions.updateCompetition(competition));
  }

  isMobile(): boolean {
    return isMobileVersion();
  }
}
