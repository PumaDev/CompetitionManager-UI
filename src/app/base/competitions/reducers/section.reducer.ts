import { ActionWithPayload, deepCloneMerge } from '../../../shared/utils/redux.utils';
import { ISectionPayload, SectionActions } from '../actions/section.actions';
import { ActionState } from '../../../shared/general/general.models';

export interface ISectionsState {
  sections: string[];
  errorCode: number;
  state: ActionState;
}

const initSectionsState: ISectionsState =  {
  sections: [],
  errorCode: 0,
  state: ActionState.INITIAL
};

export function sectionsReducer(
  state: ISectionsState = initSectionsState,
  action: ActionWithPayload<ISectionPayload>
) {
  switch (action.type) {
    case SectionActions.LOAD_SECTIONS:
      return deepCloneMerge(state, {
        state: ActionState.IN_PROGRESS
      });

    case SectionActions.LOAD_SECTIONS_SUCCESS:
      return deepCloneMerge(state, {
        sections: action.payload.sections,
        state: ActionState.SUCCEEDED
      });

    case SectionActions.LOAD_SECTIONS_FAILURE:
      return deepCloneMerge(state, {
        errorCode: action.payload.errorCode,
        state: ActionState.FAILED
      });

    default:
      return state;
  }
}
