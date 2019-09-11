import { Attachment, CreateAttachment } from '../models/attachment.models';
import { ActionWithPayload, createTypedAction } from '../../../shared/utils/redux.utils';

export class AttachmentsActions {

  static readonly LOAD_ATTACHMENTS_FOR_COMPETITION = '[Attachments] Load Attachments For Competition';
  static readonly LOAD_ATTACHMENTS_FOR_COMPETITION_SUCCESS = '[Attachments] Load Attachments For Competition Success';
  static readonly LOAD_ATTACHMENTS_FOR_COMPETITION_FAILURE = '[Attachments] Load Attachments For Competition Failure';

  static readonly CREATE_ATTACHMENT = '[Attachments] Create Attachment';
  static readonly CREATE_ATTACHMENT_SUCCESS = '[Attachments] Create Attachment Success';
  static readonly CREATE_ATTACHMENT_FAILURE = '[Attachments] Create Attachment Failure';

  static readonly DELETE_ATTACHMENT = '[Attachments] Delete Attachment';
  static readonly DELETE_ATTACHMENT_SUCCESS = '[Attachments] Delete Attachment Success';
  static readonly DELETE_ATTACHMENT_FAILURE = '[Attachments] Delete Attachment Failure';

  loadAttachmentsForCompetition(competitionId: number): ActionWithPayload<IAttachmentsPayload> {
    return createTypedAction<IAttachmentsPayload>(AttachmentsActions.LOAD_ATTACHMENTS_FOR_COMPETITION, {
      competitionId: competitionId
    });
  }

  loadAttachmentsForCompetitionSuccess(attachments: Attachment[]): ActionWithPayload<IAttachmentsPayload> {
    return createTypedAction<IAttachmentsPayload>(AttachmentsActions.LOAD_ATTACHMENTS_FOR_COMPETITION_SUCCESS, {
      attachments: attachments
    });
  }

  loadAttachmentsForCompetitionFailure(errorCode: number): ActionWithPayload<IAttachmentsPayload> {
    return createTypedAction<IAttachmentsPayload>(AttachmentsActions.LOAD_ATTACHMENTS_FOR_COMPETITION_FAILURE, {
      errorCode: errorCode
    });
  }

  createAttachment(createAttachment: CreateAttachment): ActionWithPayload<IAttachmentsPayload> {
    return createTypedAction<IAttachmentsPayload>(AttachmentsActions.CREATE_ATTACHMENT, {
      createAttachment: createAttachment
    });
  }

  createAttachmentSuccess(attachment: Attachment): ActionWithPayload<IAttachmentsPayload> {
    return createTypedAction<IAttachmentsPayload>(AttachmentsActions.CREATE_ATTACHMENT_SUCCESS, {
      attachment: attachment
    });
  }

  createAttachmentFailure(errorCode: number): ActionWithPayload<IAttachmentsPayload> {
    return createTypedAction<IAttachmentsPayload>(AttachmentsActions.LOAD_ATTACHMENTS_FOR_COMPETITION_FAILURE, {
      errorCode: errorCode
    });
  }

  deleteAttachment(attachmentId: number): ActionWithPayload<IAttachmentsPayload> {
    return createTypedAction<IAttachmentsPayload>(AttachmentsActions.DELETE_ATTACHMENT, {
      attachmentId: attachmentId
    });
  }

  deleteAttachmentSuccess(): ActionWithPayload<IAttachmentsPayload> {
    return createTypedAction<IAttachmentsPayload>(AttachmentsActions.DELETE_ATTACHMENT_SUCCESS, {});
  }

  deleteAttachmentFailure(errorCode: number): ActionWithPayload<IAttachmentsPayload> {
    return createTypedAction<IAttachmentsPayload>(AttachmentsActions.DELETE_ATTACHMENT_FAILURE, {
      errorCode: errorCode
    });
  }
}

export interface IAttachmentsPayload {
  attachmentId?: number;
  competitionId?: number;
  attachments?: Attachment[];
  createAttachment?: CreateAttachment;
  attachment?: Attachment;
  errorCode?: number;
}
