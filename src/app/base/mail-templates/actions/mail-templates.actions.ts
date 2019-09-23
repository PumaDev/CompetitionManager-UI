import {Injectable} from '@angular/core';
import {IMailTemplate} from '../mail-templates.model';
import {ActionWithPayload, createTypedAction} from '../../../shared/utils/redux.utils';

@Injectable()
export class MailTemplatesActions {

  static readonly CREATE_MAIL_TEMPLATE = '[Mail Templates] Create Mail Template';
  static readonly CREATE_MAIL_TEMPLATE_SUCCESS = '[Mail Templates] Create Mail Template Success';
  static readonly CREATE_MAIL_TEMPLATE_FAILURE = '[Mail Templates] Create Mail Template Failure';

  static readonly LOAD_MAIL_TEMPLATES = '[Mail Templates] Load Mail Templates';
  static readonly LOAD_MAIL_TEMPLATES_SUCCESS = '[Mail Templates] Load Mail Templates Success';
  static readonly LOAD_MAIL_TEMPLATES_FAILURE = '[Mail Templates] Load Mail Templates Failure';

  static readonly UPDATE_MAIL_TEMPLATE = '[Mail Templates] Update Mail Template';
  static readonly UPDATE_MAIL_TEMPLATE_SUCCESS = '[Mail Templates] Update Mail Template Success';
  static readonly UPDATE_MAIL_TEMPLATE_FAILURE = '[Mail Templates] Update Mail Template Failure';

  static readonly UPDATE_TEMPLATE_IN_MAIL_TEMPLATE = '[Mail Templates] Update Template In Mail Template';
  static readonly UPDATE_TEMPLATE_IN_MAIL_TEMPLATE_SUCCESS = '[Mail Templates] Update Template In Mail Template Success';
  static readonly UPDATE_TEMPLATE_IN_MAIL_TEMPLATE_FAILURE = '[Mail Templates] Update Template In Mail Template Failure';

  static readonly DELETE_MAIL_TEMPLATE = '[Mail Templates] Delete Mail Template';
  static readonly DELETE_MAIL_TEMPLATE_SUCCESS = '[Mail Templates] Delete Mail Template Success';
  static readonly DELETE_MAIL_TEMPLATE_FAILURE = '[Mail Templates] Delete Mail Template Failure';

  createMailTemplate(mailTemplate: IMailTemplate): ActionWithPayload<IMailTemplatesPayload> {
    return createTypedAction<IMailTemplatesPayload>(MailTemplatesActions.CREATE_MAIL_TEMPLATE, {
      mailTemplate: mailTemplate
    });
  }

  createMailTemplateSuccess(createdMailTemplate: IMailTemplate): ActionWithPayload<IMailTemplatesPayload> {
    return createTypedAction<IMailTemplatesPayload>(MailTemplatesActions.CREATE_MAIL_TEMPLATE_SUCCESS, {
      mailTemplate: createdMailTemplate
    });
  }

  createMailTemplateFailure(errorCode: number): ActionWithPayload<IMailTemplatesPayload> {
    return createTypedAction<IMailTemplatesPayload>(MailTemplatesActions.CREATE_MAIL_TEMPLATE_FAILURE, {
      errorCode: errorCode
    });
  }

  loadMailTemplates(): ActionWithPayload<IMailTemplatesPayload> {
    return createTypedAction<IMailTemplatesPayload>(MailTemplatesActions.LOAD_MAIL_TEMPLATES, {});
  }

  loadMailTemplatesSuccess(mailTemplates: IMailTemplate[]): ActionWithPayload<IMailTemplatesPayload> {
    return createTypedAction<IMailTemplatesPayload>(MailTemplatesActions.LOAD_MAIL_TEMPLATES_SUCCESS, {
      mailTemplates: mailTemplates
    });
  }

  loadMailTemplatesFailure(errorCode: number): ActionWithPayload<IMailTemplatesPayload> {
    return createTypedAction<IMailTemplatesPayload>(MailTemplatesActions.LOAD_MAIL_TEMPLATES_FAILURE, {
      errorCode: errorCode
    });
  }

  updateMailTemplate(mailTemplateWithUpdates: IMailTemplate): ActionWithPayload<IMailTemplatesPayload> {
    return createTypedAction<IMailTemplatesPayload>(MailTemplatesActions.UPDATE_MAIL_TEMPLATE, {
      mailTemplate: mailTemplateWithUpdates
    });
  }

  updateMailTemplateSuccess(updatedMailTemplate: IMailTemplate): ActionWithPayload<IMailTemplatesPayload> {
    return createTypedAction<IMailTemplatesPayload>(MailTemplatesActions.UPDATE_MAIL_TEMPLATE_SUCCESS, {
      mailTemplate: updatedMailTemplate
    });
  }

  updateMailTemplateFailure(errorCode: number): ActionWithPayload<IMailTemplatesPayload> {
    return createTypedAction<IMailTemplatesPayload>(MailTemplatesActions.UPDATE_MAIL_TEMPLATE_FAILURE, {
      errorCode: errorCode
    });
  }

  updateTemplateInMailTemplate(mailTemplateId: number, newTemplate: string): ActionWithPayload<IMailTemplatesPayload> {
    return createTypedAction<IMailTemplatesPayload>(MailTemplatesActions.UPDATE_TEMPLATE_IN_MAIL_TEMPLATE, {
      mailTemplateId: mailTemplateId,
      template: newTemplate
    });
  }

  updateTemplateInMailTemplateSuccess(updatesMailTemplate: IMailTemplate): ActionWithPayload<IMailTemplatesPayload> {
    return createTypedAction<IMailTemplatesPayload>(MailTemplatesActions.UPDATE_TEMPLATE_IN_MAIL_TEMPLATE_SUCCESS, {
      mailTemplate: updatesMailTemplate
    });
  }

  updateTemplateInMailTemplateFailure(errorCode: number): ActionWithPayload<IMailTemplatesPayload> {
    return createTypedAction<IMailTemplatesPayload>(MailTemplatesActions.UPDATE_TEMPLATE_IN_MAIL_TEMPLATE_FAILURE, {
      errorCode: errorCode
    });
  }

  deleteMailTemplate(mailTemplateId: number): ActionWithPayload<IMailTemplatesPayload> {
    return createTypedAction<IMailTemplatesPayload>(MailTemplatesActions.DELETE_MAIL_TEMPLATE, {
      mailTemplateId: mailTemplateId
    });
  }

  deleteMailTemplateSuccess(deletedMailTemplate: IMailTemplate): ActionWithPayload<IMailTemplatesPayload> {
    return createTypedAction<IMailTemplatesPayload>(MailTemplatesActions.DELETE_MAIL_TEMPLATE_SUCCESS, {
      mailTemplate: deletedMailTemplate
    });
  }

  deleteMailTemplateFailure(errorCode: number): ActionWithPayload<IMailTemplatesPayload> {
    return createTypedAction<IMailTemplatesPayload>(MailTemplatesActions.DELETE_MAIL_TEMPLATE_FAILURE, {
      errorCode: errorCode
    });
  }
}

export interface IMailTemplatesPayload {
  mailTemplates?: IMailTemplate[];
  mailTemplate?: IMailTemplate;
  mailTemplateId?: number;
  template?: string;
  errorCode?: number;
}
