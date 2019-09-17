import {State} from '../../../app.reducers';
import {createSelector, MemoizedSelector} from '@ngrx/store';
import {IAttachment} from '../models/attachment.models';
import {IAttachmentsState} from './attachments.reducer';
import {ActionState} from '../../../shared/general/general.models';

const attachmentsSelector = (state: State) => state.attachmentsReducer;

export const getAttachmentsSelector: MemoizedSelector<State, IAttachment[]> = createSelector(
  attachmentsSelector,
  (state: IAttachmentsState) => state.attachments
);

export const getLoadAttachmentsActionStateSelector: MemoizedSelector<State, ActionState> = createSelector(
  attachmentsSelector,
  (state: IAttachmentsState) => state.loadAttachmentsState
);
