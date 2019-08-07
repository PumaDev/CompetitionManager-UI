import {Component, Input} from '@angular/core';
import {ICompetition} from '../../models/competitions.models';
import {Store} from '@ngrx/store';
import {State} from '../../../../app.reducers';
import {CompetitionsActions} from '../../actions';

@Component({
  selector: 'app-competition-registration-status-manager-smart',
  templateUrl: './competition-registration-status-manager.smart.component.html'
})
export class CompetitionRegistrationStatusManagerSmartComponent {

  @Input() competition: ICompetition;

  @Input() canManageRegistrationStatus = false;

  constructor(private store: Store<State>,
              private competitionsActions: CompetitionsActions) {
  }

  setCompetitionStatus(competition: ICompetition) {
    this.store.dispatch(this.competitionsActions.setRegistrationStatus(competition.id, competition.registrationStatus));
  }
}
