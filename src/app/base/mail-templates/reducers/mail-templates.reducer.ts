import {IMailTemplate} from '../mail-templates.model';
import {ActionState} from '../../../shared/general/general.models';
import {ActionWithPayload, deepCloneMerge} from '../../../shared/utils/redux.utils';
import {IMailTemplatesPayload, MailTemplatesActions} from '../actions/mail-templates.actions';

export interface IMailTemplatesState {
  mailTemplates: IMailTemplate[];
  loadMailTemplatesActionState: ActionState;
  actionState: ActionState;
  errorCode: number;
}

const initialMailTemplatesState: IMailTemplatesState = {
  mailTemplates: [],
  loadMailTemplatesActionState: ActionState.INITIAL,
  actionState: ActionState.INITIAL,
  errorCode: 0
};

export function mailTemplatesReducer(state: IMailTemplatesState = initialMailTemplatesState,
                                     action: ActionWithPayload<IMailTemplatesPayload>): IMailTemplatesState {
  switch (action.type) {

    case MailTemplatesActions.LOAD_MAIL_TEMPLATES:
      return deepCloneMerge(state, {
        loadMailTemplatesActionState: ActionState.IN_PROGRESS
      });

    case MailTemplatesActions.CREATE_MAIL_TEMPLATE:
    case MailTemplatesActions.UPDATE_MAIL_TEMPLATE:
    case MailTemplatesActions.UPDATE_TEMPLATE_IN_MAIL_TEMPLATE:
    case MailTemplatesActions.DELETE_MAIL_TEMPLATE:
      return deepCloneMerge(state, {
        actionState: ActionState.IN_PROGRESS
      });

    case MailTemplatesActions.CREATE_MAIL_TEMPLATE_SUCCESS:
      return deepCloneMerge(state, {
        mailTemplates: [...deepCloneMerge(state.mailTemplates), action.payload.mailTemplate],
        actionState: ActionState.SUCCEEDED
      });

    case MailTemplatesActions.LOAD_MAIL_TEMPLATES_SUCCESS:
      return deepCloneMerge(state, {
        mailTemplates: action.payload.mailTemplates,
        loadMailTemplatesActionState: ActionState.SUCCEEDED
      });

    case MailTemplatesActions.UPDATE_MAIL_TEMPLATE_SUCCESS:
    case MailTemplatesActions.UPDATE_TEMPLATE_IN_MAIL_TEMPLATE_SUCCESS:
      return deepCloneMerge(state, {
        mailTemplates: replaceMailTemplateInList(action.payload.mailTemplate, state.mailTemplates),
        actionState: ActionState.SUCCEEDED
      });

    case MailTemplatesActions.DELETE_MAIL_TEMPLATE_SUCCESS:
      return deepCloneMerge(state, {
        mailTemplates: deepCloneMerge(state.mailTemplates).filter((mailTemplate) => mailTemplate.id !== action.payload.mailTemplate.id),
        actionState: ActionState.SUCCEEDED
      });

    case MailTemplatesActions.LOAD_MAIL_TEMPLATES_FAILURE:
      return deepCloneMerge(state, {
        errorCode: action.payload.errorCode,
        loadMailTemplatesActionState: ActionState.FAILED
      });

    case MailTemplatesActions.CREATE_MAIL_TEMPLATE_FAILURE:
    case MailTemplatesActions.UPDATE_MAIL_TEMPLATE_FAILURE:
    case MailTemplatesActions.UPDATE_TEMPLATE_IN_MAIL_TEMPLATE_FAILURE:
    case MailTemplatesActions.DELETE_MAIL_TEMPLATE_FAILURE:
      return deepCloneMerge(state, {
        errorCode: action.payload.errorCode,
        actionState: ActionState.FAILED
      });

    default:
      return state;

  }
}

function replaceMailTemplateInList(newMailTemplate: IMailTemplate, list: IMailTemplate[]): IMailTemplate[] {
  const newList = deepCloneMerge(list, {});
  const index = list.findIndex((mailTemplate: IMailTemplate) => mailTemplate.id === newMailTemplate.id);
  newList[index] = newMailTemplate;

  return newList;
}
