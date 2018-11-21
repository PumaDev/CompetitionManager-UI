import { Injectable } from '@angular/core';
import { ICompetitionCategory } from '../models/category.model';
import { ActionWithPayload, createTypedAction } from '../../../shared/utils/redux.utils';

@Injectable()
export class CompetitionCategoriesActions {

  static LOAD_COMPETITION_CATEGORIES = '[Competition Category] Load Competition Categories';
  static LOAD_COMPETITION_CATEGORIES_SUCCESS = '[Competition Category] Load Competition Categories Success';
  static LOAD_COMPETITION_CATEGORIES_FAILURE = '[Competition Category] Load Competition Categories Failure';

  loadCompetitionCategories(): ActionWithPayload<ICompetitionCategoryPayload> {
    return createTypedAction<ICompetitionCategoryPayload>(CompetitionCategoriesActions.LOAD_COMPETITION_CATEGORIES, {});
  }

  loadCompetitionCategoriesSuccess(categories: ICompetitionCategory[]): ActionWithPayload<ICompetitionCategoryPayload> {
    return createTypedAction<ICompetitionCategoryPayload>(CompetitionCategoriesActions.LOAD_COMPETITION_CATEGORIES_SUCCESS, {
      categories: categories
    });
  }

  loadCompetitionCategoriesFailure(): ActionWithPayload<ICompetitionCategoryPayload> {
    return createTypedAction<ICompetitionCategoryPayload>(CompetitionCategoriesActions.LOAD_COMPETITION_CATEGORIES_FAILURE, {});
  }
}

export interface ICompetitionCategoryPayload {
  categories?: ICompetitionCategory[];
}
