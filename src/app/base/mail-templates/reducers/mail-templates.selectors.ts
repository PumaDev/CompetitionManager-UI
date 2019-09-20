import {State} from '../../../app.reducers';
import {createSelector, MemoizedSelector} from '@ngrx/store';
import {IMailTemplate} from '../mail-templates.model';
import {IMailTemplatesState} from './mail-templates.reducer';
import {ActionState} from '../../../shared/general/general.models';

const mailTemplatesStateSelector = (state: State) => state.mailTemplatesReducer;

export const getMailTemplatesSelector: MemoizedSelector<State, IMailTemplate[]> = createSelector(
  mailTemplatesStateSelector,
  (state: IMailTemplatesState) => state.mailTemplates
);

export const getLoadMailTemplatesActionStateSelector: MemoizedSelector<State, ActionState> = createSelector(
  mailTemplatesStateSelector,
  (state: IMailTemplatesState) => state.loadMailTemplatesActionState
);
