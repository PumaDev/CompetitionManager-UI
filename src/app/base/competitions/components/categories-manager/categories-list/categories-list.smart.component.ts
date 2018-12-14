import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../../../app.reducers';
import { CompetitionCategoriesActions } from '../../../actions';
import { getCompetitionCategoriesSelector, getCompetitionStateSelector } from '../../../reducers/categories.selector';
import { Observable } from 'rxjs';
import { ICompetitionCategory } from '../../../models/category.model';
import { ActionState } from '../../../../../shared/general/general.models';

@Component({
  selector: 'app-categories-list-smart',
  templateUrl: 'categories-list.smart.component.html'
})
export class CategoriesListSmartComponent {

  categories$: Observable<ICompetitionCategory[]> = this.store.pipe(select(getCompetitionCategoriesSelector));
  categoriesLoadState$: Observable<ActionState> = this.store.pipe(select(getCompetitionStateSelector));

  constructor(private store: Store<State>,
              private categoriesActions: CompetitionCategoriesActions) {
    this.store.dispatch(this.categoriesActions.loadCompetitionCategories());
  }
}
