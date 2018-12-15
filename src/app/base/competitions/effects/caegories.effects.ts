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
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class CompetitionCategoriesEffects {

  @Effect() loadCompetitionCategories$;
  @Effect() createCompetitionCategory$;
  @Effect() loadCategoriesByCompetition$;

  constructor(private actions$: Actions<ActionWithPayload<ICompetitionPayload>>,
              private store: Store<State>,
              private categoriesService: CompetitionCategoriesService,
              private categoriesActions: CompetitionCategoriesActions) {

    /*****************************************************************************
     * Load Competition Categories
     *****************************************************************************/
    this.loadCompetitionCategories$ = this.actions$.pipe(
      ofType(CompetitionCategoriesActions.LOAD_ALL_COMPETITION_CATEGORIES),
      map((action: ActionWithPayload<ICompetitionCategoryPayload>) => ({...action.payload})),
      switchMap(({}: {}) =>
        this.categoriesService.getAllCompetitionCategories()
          .pipe(
            map((categories: ICompetitionCategory[]) => this.categoriesActions.loadCompetitionCategoriesSuccess(categories)),
            catchError((errorResponse: HttpErrorResponse) =>
              of(this.categoriesActions.loadCompetitionCategoriesFailure(errorResponse.error.errorCode ? errorResponse.error.errorCode : 500))
            )
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

    /*****************************************************************************
     * Load Categories By Competition
     *****************************************************************************/
    this.loadCategoriesByCompetition$ = this.actions$.pipe(
      ofType(CompetitionCategoriesActions.LOAD_CATEGORIES_BY_COMPETITION),
      map((action: ActionWithPayload<ICompetitionCategoryPayload>) => ({...action.payload})),
      switchMap(({ competitionId }: { competitionId: number }) =>
        this.categoriesService.getCategoriesByCompetition(competitionId)
          .pipe(
            map((categories: ICompetitionCategory[]) => this.categoriesActions.loadCategoriesByCompetitionSuccess(categories)),
            catchError((errorResponse: HttpErrorResponse) =>
              of(this.categoriesActions.loadCategoriesByCompetitionFailure(errorResponse.error.errorCode ? errorResponse.error.errorCode : 500))
            )
          )
      )
    );
  }
}
