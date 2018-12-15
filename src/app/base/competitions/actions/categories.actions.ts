import { Injectable } from '@angular/core';
import { ICompetitionCategory } from '../models/category.model';
import { ActionWithPayload, createTypedAction } from '../../../shared/utils/redux.utils';

@Injectable()
export class CompetitionCategoriesActions {

  static LOAD_ALL_COMPETITION_CATEGORIES = '[Competition Category] Load All Competition Categories';
  static LOAD_ALL_COMPETITION_CATEGORIES_SUCCESS = '[Competition Category] Load All Competition Categories Success';
  static LOAD_ALL_COMPETITION_CATEGORIES_FAILURE = '[Competition Category] Load All Competition Categories Failure';

  static LOAD_CATEGORIES_BY_COMPETITION = '[Competition Category] Load Categories By Competition';
  static LOAD_CATEGORIES_BY_COMPETITION_SUCCESS = '[Competition Category] Load Categories By Competition Success';
  static LOAD_CATEGORIES_BY_COMPETITION_FAILURE = '[Competition Category] Load Categories By Competition Failure';


  static CREATE_COMPETITION_CATEGORY = '[Competition Category] Create Competition Category';
  static CREATE_COMPETITION_CATEGORY_SUCCESS = '[Competition Category] Create Competition Category Success';
  static CREATE_COMPETITION_CATEGORY_FAILURE = '[Competition Category] Create Competition Category Failure';

  loadCompetitionCategories(): ActionWithPayload<ICompetitionCategoryPayload> {
    return createTypedAction<ICompetitionCategoryPayload>(CompetitionCategoriesActions.LOAD_ALL_COMPETITION_CATEGORIES, {});
  }

  loadCompetitionCategoriesSuccess(categories: ICompetitionCategory[]): ActionWithPayload<ICompetitionCategoryPayload> {
    return createTypedAction<ICompetitionCategoryPayload>(CompetitionCategoriesActions.LOAD_ALL_COMPETITION_CATEGORIES_SUCCESS, {
      categories: categories
    });
  }

  loadCompetitionCategoriesFailure(errorCode: number): ActionWithPayload<ICompetitionCategoryPayload> {
    return createTypedAction<ICompetitionCategoryPayload>(CompetitionCategoriesActions.LOAD_ALL_COMPETITION_CATEGORIES_FAILURE, {
      errorCode: errorCode
    });
  }

  loadCategoriesByCompetition(competitionId: number): ActionWithPayload<ICompetitionCategoryPayload> {
    return createTypedAction<ICompetitionCategoryPayload>(CompetitionCategoriesActions.LOAD_CATEGORIES_BY_COMPETITION, {
      competitionId: competitionId
    });
  }

  loadCategoriesByCompetitionSuccess(categories: ICompetitionCategory[]): ActionWithPayload<ICompetitionCategoryPayload> {
    return createTypedAction<ICompetitionCategoryPayload>(CompetitionCategoriesActions.LOAD_CATEGORIES_BY_COMPETITION_SUCCESS, {
      categories: categories
    });
  }

  loadCategoriesByCompetitionFailure(errorCode: number): ActionWithPayload<ICompetitionCategoryPayload> {
    return createTypedAction<ICompetitionCategoryPayload>(CompetitionCategoriesActions.LOAD_CATEGORIES_BY_COMPETITION_FAILURE, {
      errorCode: errorCode
    });
  }

  createCompetitionCategory(newCompetition: ICompetitionCategory): ActionWithPayload<ICompetitionCategoryPayload> {
    return createTypedAction<ICompetitionCategoryPayload>(CompetitionCategoriesActions.CREATE_COMPETITION_CATEGORY, {
      category: newCompetition
    });
  }

  createCompetitionCategorySuccess(createdCompetition: ICompetitionCategory): ActionWithPayload<ICompetitionCategoryPayload> {
    return createTypedAction<ICompetitionCategoryPayload>(CompetitionCategoriesActions.CREATE_COMPETITION_CATEGORY_SUCCESS, {
      category: createdCompetition
    });
  }

  createCompetitionCategoryFailure(): ActionWithPayload<ICompetitionCategoryPayload> {
    return createTypedAction<ICompetitionCategoryPayload>(CompetitionCategoriesActions.CREATE_COMPETITION_CATEGORY_FAILURE, {});
  }
}

export interface ICompetitionCategoryPayload {
  category?: ICompetitionCategory;
  categories?: ICompetitionCategory[];
  competitionId?: number;
  errorCode?: number;
}
