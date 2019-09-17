import { IAttachment, CreateAttachment } from '../models/attachment.models';
import { ActionWithPayload, createTypedAction } from '../../../shared/utils/redux.utils';
import {Injectable} from '@angular/core';

@Injectable()
export class AttachmentsActions {

  static readonly LOAD_ATTACHMENTS_FOR_COMPETITION = '[Attachments] Load Attachments For Competition';
  static readonly LOAD_ATTACHMENTS_FOR_COMPETITION_SUCCESS = '[Attachments] Load Attachments For Competition Success';
  static readonly LOAD_ATTACHMENTS_FOR_COMPETITION_FAILURE = '[Attachments] Load Attachments For Competition Failure';

  static readonly CREATE_ATTACHMENT = '[Attachments] Create IAttachment';
  static readonly CREATE_ATTACHMENT_SUCCESS = '[Attachments] Create IAttachment Success';
  static readonly CREATE_ATTACHMENT_FAILURE = '[Attachments] Create IAttachment Failure';

  static readonly DELETE_ATTACHMENT = '[Attachments] Delete IAttachment';
  static readonly DELETE_ATTACHMENT_SUCCESS = '[Attachments] Delete IAttachment Success';
  static readonly DELETE_ATTACHMENT_FAILURE = '[Attachments] Delete IAttachment Failure';

  loadAttachmentsForCompetition(competitionId: number): ActionWithPayload<IAttachmentsPayload> {
    return createTypedAction<IAttachmentsPayload>(AttachmentsActions.LOAD_ATTACHMENTS_FOR_COMPETITION, {
      competitionId: competitionId
    });
  }

  loadAttachmentsForCompetitionSuccess(attachments: IAttachment[]): ActionWithPayload<IAttachmentsPayload> {
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

  createAttachmentSuccess(attachment: IAttachment): ActionWithPayload<IAttachmentsPayload> {
    return createTypedAction<IAttachmentsPayload>(AttachmentsActions.CREATE_ATTACHMENT_SUCCESS, {
      attachment: attachment
    });
  }

  createAttachmentFailure(errorCode: number): ActionWithPayload<IAttachmentsPayload> {
    return createTypedAction<IAttachmentsPayload>(AttachmentsActions.CREATE_ATTACHMENT_FAILURE, {
      errorCode: errorCode
    });
  }

  deleteAttachment(competitionId: number, attachmentId: number): ActionWithPayload<IAttachmentsPayload> {
    return createTypedAction<IAttachmentsPayload>(AttachmentsActions.DELETE_ATTACHMENT, {
      competitionId: competitionId,
      attachmentId: attachmentId
    });
  }

  deleteAttachmentSuccess(attachmentId: number): ActionWithPayload<IAttachmentsPayload> {
    return createTypedAction<IAttachmentsPayload>(AttachmentsActions.DELETE_ATTACHMENT_SUCCESS, {
      attachmentId: attachmentId
    });
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
  attachments?: IAttachment[];
  createAttachment?: CreateAttachment;
  attachment?: IAttachment;
  errorCode?: number;
}
