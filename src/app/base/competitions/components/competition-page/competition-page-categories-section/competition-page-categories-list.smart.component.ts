import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../../app.reducers';
import {Observable} from 'rxjs';
import {ICompetitionCategory} from '../../../models/category.model';
import {getCategoriesFromCompetitionSelector} from '../../../reducers/competitions.selector';
import {CompetitionsActions} from '../../../actions';

@Component({
  selector: 'app-competition-page-categories-list-smart',
  templateUrl: './competition-page-categories-list.smart.component.html'
})
export class CompetitionPageCategoriesListSmartComponent implements OnInit {

  @Input() competitionId: number;

  categories$: Observable<ICompetitionCategory[]> = this.store.pipe(select(getCategoriesFromCompetitionSelector));

  constructor(private store: Store<State>,
              private competitionsActions: CompetitionsActions) {
  }

  ngOnInit(): void {
  }

  addCategoriesToCompetition(categories: ICompetitionCategory[]): void {
    this.store.dispatch(this.competitionsActions.addCompetitionCategoriesToCompetition(this.competitionId, categories));
  }
}
