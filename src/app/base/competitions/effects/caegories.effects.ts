import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ActionWithPayload } from '../../../shared/utils/redux.utils';
import { ICompetitionPayload } from '../actions/competitions.actions';
import { Store } from '@ngrx/store';
import { State } from '../../../app.reducers';
import { CompetitionCategoriesService } from '../service/categories.service';
import { CompetitionCategoriesActions } from '../actions';
import { ICompetitionCategoryPayload } from '../actions/categories.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ICompetitionCategory } from '../models/category.model';

@Injectable()
export class CompetitionCategoriesEffects {
  @Effect() loadCompetitionCategories$;
  @Effect() createCompetitionCategory$;

  constructor(private actions$: Actions<ActionWithPayload<ICompetitionPayload>>,
              private store: Store<State>,
              private categoriesService: CompetitionCategoriesService,
              private categoriesActions: CompetitionCategoriesActions) {

    /*****************************************************************************
     * Load Competition Categories
     *****************************************************************************/
    this.loadCompetitionCategories$ = this.actions$.pipe(
      ofType(CompetitionCategoriesActions.LOAD_COMPETITION_CATEGORIES),
      map((action: ActionWithPayload<ICompetitionCategoryPayload>) => ({...action.payload})),
      switchMap(({}: {}) =>
        this.categoriesService.getAllCompetitionCategories()
          .pipe(
            map((categories: ICompetitionCategory[]) => this.categoriesActions.loadCompetitionCategoriesSuccess(categories))
          )
      )
    );

    /*****************************************************************************
     * Create Competition Categories
     *****************************************************************************/
    this.createCompetitionCategory$ = this.actions$.pipe(
      ofType(CompetitionCategoriesActions.CREATE_COMPETITION_CATEGORY),
      map((action: ActionWithPayload<ICompetitionCategoryPayload>) => ({...action.payload})),
      switchMap(({category}: { category: ICompetitionCategory }) =>
        this.categoriesService.createCompetitionCategory(category)
          .pipe(
            map((createdCategory) => this.categoriesActions.createCompetitionCategorySuccess(createdCategory))
          )
      )
    );
  }
}
