import {IAttachment} from '../models/attachment.models';
import {ActionState} from '../../../shared/general/general.models';
import {ActionWithPayload, deepCloneMerge} from '../../../shared/utils/redux.utils';
import {AttachmentsActions, IAttachmentsPayload} from '../actions/attachments.actions';

export interface IAttachmentsState {
  attachments: IAttachment[];
  errorCode: number;
  loadAttachmentsState: ActionState;
  createAttachmentState: ActionState;
  deleteAttachmentState: ActionState;
}

const initialAttachmentsState: IAttachmentsState = {
  attachments: [],
  errorCode: 0,
  loadAttachmentsState: ActionState.INITIAL,
  createAttachmentState: ActionState.INITIAL,
  deleteAttachmentState: ActionState.INITIAL
};

export function attachmentsReducer(
  state: IAttachmentsState = initialAttachmentsState,
  action: ActionWithPayload<IAttachmentsPayload>
): IAttachmentsState {
  switch (action.type) {
    case AttachmentsActions.LOAD_ATTACHMENTS_FOR_COMPETITION:
      return deepCloneMerge(state, {
        attachments: [],
        loadAttachmentsState: ActionState.IN_PROGRESS
      });

    case AttachmentsActions.LOAD_ATTACHMENTS_FOR_COMPETITION_SUCCESS:
      return deepCloneMerge(state, {
        attachments: action.payload.attachments,
        loadAttachmentsState: ActionState.SUCCEEDED
      });

    case AttachmentsActions.LOAD_ATTACHMENTS_FOR_COMPETITION_FAILURE:
      return deepCloneMerge(state, {
        errorCode: action.payload.errorCode,
        loadAttachmentsState: ActionState.FAILED
      });

    case AttachmentsActions.CREATE_ATTACHMENT:
      return deepCloneMerge(state, {
        createAttachmentsState: ActionState.IN_PROGRESS
      });

    case AttachmentsActions.CREATE_ATTACHMENT_SUCCESS:
      return deepCloneMerge(state, {
        attachments: [...deepCloneMerge([], state.attachments), action.payload.attachment],
        createAttachmentsState: ActionState.SUCCEEDED
      });

    case AttachmentsActions.CREATE_ATTACHMENT_FAILURE:
      return deepCloneMerge(state, {
        errorCode: action.payload.errorCode,
        createAttachmentsState: ActionState.FAILED
      });

    case AttachmentsActions.DELETE_ATTACHMENT:
      return deepCloneMerge(state, {
        deleteAttachmentsState: ActionState.IN_PROGRESS
      });

    case AttachmentsActions.DELETE_ATTACHMENT_SUCCESS:
      return deepCloneMerge(state, {
        attachments: deepCloneMerge([], state.attachments).filter((attachment) => attachment.id !== action.payload.attachmentId),
        deleteAttachmentsState: ActionState.SUCCEEDED
      });

    case AttachmentsActions.DELETE_ATTACHMENT_FAILURE:
      return deepCloneMerge(state, {
        errorCode: action.payload.errorCode,
        deleteAttachmentsState: ActionState.FAILED
      });

    default:
      return state;
  }
}
