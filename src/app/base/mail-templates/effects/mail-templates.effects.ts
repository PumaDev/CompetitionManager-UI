import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {ActionWithPayload} from '../../../shared/utils/redux.utils';
import {IUsersPayload} from '../../users/actions/users.actions';
import {Store} from '@ngrx/store';
import {State} from '../../../app.reducers';
import {MatSnackBar} from '@angular/material';
import {MailTemplatesService} from '../services/mail-templates.service';
import {MailTemplatesActions} from '../actions';

@Injectable()
export class MailTemplatesEffects {

  @Effect() createMailTemplateEffect$;
  @Effect() createMailTemplateEffectSuccess$;
  @Effect() createMailTemplateEffectFailure$;

  @Effect() loadMailTemplatesEffect$;

  @Effect() updateMailTemplatesEffect$;
  @Effect() updateMailTemplateEffectSuccess$;
  @Effect() updateMailTemplateEffectFailure$;

  @Effect() updateTemplateInMailTemplateEffect$;

  constructor(private actions$: Actions<ActionWithPayload<IUsersPayload>>,
              private store: Store<State>,
              private mailTemplatesService: MailTemplatesService,
              private mailTemplatesActions: MailTemplatesActions,
              private _snackBar: MatSnackBar) {
  }
}
