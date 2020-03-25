import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ActionState} from '../../../../shared/general/general.models';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.reducers';
import {getCreateCompetitionActionState} from '../../reducers/competitions.selector';
import {ICompetition} from '../../models/competitions.models';
import {CompetitionsActions} from '../../actions';
import { isMobileVersion } from 'src/app/shared/screen-state/mobile.state';

@Component({
  selector: 'app-new-competition-smart',
  templateUrl: './new-competition.smart.component.html'
})
export class NewCompetitionSmartComponent implements OnInit {

  actionState$: Observable<ActionState> = this.store.pipe(select(getCreateCompetitionActionState));

  constructor(private store: Store<State>,
              private competitionActions: CompetitionsActions) {
  }

  ngOnInit(): void {
    this.store.dispatch(this.competitionActions.clearCreateState());
  }

  save(competition: ICompetition) {
    this.store.dispatch(this.competitionActions.createCompetition(competition));
  }

  isMobile() {
    return isMobileVersion();
  }
}
