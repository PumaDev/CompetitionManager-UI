import { ActionState } from '../../../shared/general/general.models';
import { ICompetitionCategory } from '../models/category.model';
import { CompetitionCategoriesActions, ICompetitionCategoryPayload } from '../actions/categories.actions';
import { ActionWithPayload, deepCloneMerge } from '../../../shared/utils/redux.utils';

export interface ICompetitionCategoriesState {
  categories: ICompetitionCategory[];
  state: ActionState;
}

export const competitionCategoriesInitState: ICompetitionCategoriesState = {
  categories: [],
  state: ActionState.INITIAL
};

export function competitionCategoriesReducer(
  state: ICompetitionCategoriesState = competitionCategoriesInitState,
  action: ActionWithPayload<ICompetitionCategoryPayload>
): ICompetitionCategoriesState {
  switch (action.type) {
    case CompetitionCategoriesActions.LOAD_COMPETITION_CATEGORIES:
      return deepCloneMerge(state, {
        state: ActionState.IN_PROGRESS
      });

    case CompetitionCategoriesActions.LOAD_COMPETITION_CATEGORIES_SUCCESS:
      return deepCloneMerge(state, {
        categories: action.payload.categories,
        state: ActionState.SUCCEEDED
      });

    case CompetitionCategoriesActions.CREATE_COMPETITION_CATEGORY_FAILURE:
    case CompetitionCategoriesActions.LOAD_COMPETITION_CATEGORIES_FAILURE:
      return deepCloneMerge(state, {
        state: ActionState.FAILED
      });

    case CompetitionCategoriesActions.CREATE_COMPETITION_CATEGORY:
      return deepCloneMerge(state, {
        state: ActionState.IN_PROGRESS
      });

    case CompetitionCategoriesActions.CREATE_COMPETITION_CATEGORY_SUCCESS:
      return deepCloneMerge(state, {
        categories: [...state.categories, action.payload.category],
        state: ActionState.SUCCEEDED
      });

    default:
      return state;
  }
}
