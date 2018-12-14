import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../../../app.reducers';
import { CompetitionsActions } from '../../../actions';
import { getCompetitionSelector } from '../../../reducers/competitions.selector';

@Component({
  selector: 'app-competition-details-smart',
  templateUrl: './competition-details.smart.component.html'
})
export class CompetitionDetailsSmartComponent implements OnInit {

  @Input() competitionId: number;

  competition$ = this.store.pipe(select(getCompetitionSelector));

  constructor(private store: Store<State>,
              private competitionActions: CompetitionsActions
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(this.competitionActions.loadCompetition(this.competitionId));
  }

}
