import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ActionWithPayload, EMPTY_ACTION} from '../../../shared/utils/redux.utils';
import {IUsersPayload} from '../../users/actions/users.actions';
import {Store} from '@ngrx/store';
import {State} from '../../../app.reducers';
import {MatSnackBar} from '@angular/material';
import {MailTemplatesService} from '../services/mail-templates.service';
import {MailTemplatesActions} from '../actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {IMailTemplatesPayload} from '../actions/mail-templates.actions';
import {IMailTemplate} from '../mail-templates.model';
import {HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';

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
  @Effect() updateTemplateInMailTemplateEffectSuccess$;
  @Effect() updateTemplateInMailTemplateEffectFailure$;

  @Effect() deleteMailTemplateEffect$;
  @Effect() deleteMailTemplateEffectSuccess$;
  @Effect() deleteMailTemplateEffectFailure$;

  constructor(private actions$: Actions<ActionWithPayload<IUsersPayload>>,
              private store: Store<State>,
              private mailTemplatesService: MailTemplatesService,
              private mailTemplatesActions: MailTemplatesActions,
              private _snackBar: MatSnackBar) {

    /************************************************************************************
     * Create Mail Template
     ************************************************************************************/
    this.createMailTemplateEffect$ = this.actions$.pipe(
      ofType(MailTemplatesActions.CREATE_MAIL_TEMPLATE),
      map((action: ActionWithPayload<IMailTemplatesPayload>) => ({...action.payload})),
      switchMap(({mailTemplate}: { mailTemplate: IMailTemplate }) =>
        this.mailTemplatesService.createMailTemplate(mailTemplate)
          .pipe(
            map((createdMailTemplate: IMailTemplate) => this.mailTemplatesActions.createMailTemplateSuccess(createdMailTemplate)),
            catchError((errorResponse: HttpErrorResponse) =>
              of(this.mailTemplatesActions.createMailTemplateFailure(errorResponse.error.errorCode))
            )
          )
      )
    );

    /************************************************************************************
     * Create Mail Template Success
     ************************************************************************************/
    this.createMailTemplateEffectSuccess$ = this.actions$.pipe(
      ofType(MailTemplatesActions.CREATE_MAIL_TEMPLATE_SUCCESS),
      map((action: ActionWithPayload<IMailTemplatesPayload>) => ({...action.payload})),
      switchMap(() => {
          this._snackBar.open('Шаблон создан', 'OK', {
            duration: 5 * 1000
          });
          return of(EMPTY_ACTION);
        }
      )
    );

    /************************************************************************************
     * Create Mail Template Failure
     ************************************************************************************/
    this.createMailTemplateEffectFailure$ = this.actions$.pipe(
      ofType(MailTemplatesActions.CREATE_MAIL_TEMPLATE_FAILURE),
      map((action: ActionWithPayload<IMailTemplatesPayload>) => ({...action.payload})),
      switchMap(() => {
          this._snackBar.open('Ошибка при создании шаблона', 'OK', {
            duration: 5 * 1000
          });
          return of(EMPTY_ACTION);
        }
      )
    );

    /************************************************************************************
     * Load All Mail Templates
     ************************************************************************************/
    this.loadMailTemplatesEffect$ = this.actions$.pipe(
      ofType(MailTemplatesActions.LOAD_MAIL_TEMPLATES),
      switchMap(() =>
        this.mailTemplatesService.getMailTemplates()
          .pipe(
            map((mailTemplates: IMailTemplate[]) => this.mailTemplatesActions.loadMailTemplatesSuccess(mailTemplates)),
            catchError((errorResponse: HttpErrorResponse) =>
              of(this.mailTemplatesActions.loadMailTemplatesFailure(errorResponse.error.errorCode))
            )
          )
      )
    );

    /************************************************************************************
     * Update Mail Template
     ************************************************************************************/
    this.updateMailTemplatesEffect$ = this.actions$.pipe(
      ofType(MailTemplatesActions.UPDATE_MAIL_TEMPLATE),
      map((action: ActionWithPayload<IMailTemplatesPayload>) => ({...action.payload})),
      switchMap(({mailTemplate}: { mailTemplate: IMailTemplate }) =>
        this.mailTemplatesService.updateMailTemplate(mailTemplate)
          .pipe(
            map((updatedMailTemplate: IMailTemplate) => this.mailTemplatesActions.updateMailTemplateSuccess(updatedMailTemplate)),
            catchError((errorResponse: HttpErrorResponse) =>
              of(this.mailTemplatesActions.updateMailTemplateFailure(errorResponse.error.errorCode))
            )
          )
      )
    );

    /************************************************************************************
     * Update Mail Template Success
     ************************************************************************************/
    this.updateMailTemplateEffectSuccess$ = this.actions$.pipe(
      ofType(MailTemplatesActions.UPDATE_MAIL_TEMPLATE_SUCCESS),
      map((action: ActionWithPayload<IMailTemplatesPayload>) => ({...action.payload})),
      switchMap(() => {
          this._snackBar.open('Шаблон обновлён', 'OK', {
            duration: 5 * 1000
          });
          return of(EMPTY_ACTION);
        }
      )
    );

    /************************************************************************************
     * Update Mail Template Failure
     ************************************************************************************/
    this.updateMailTemplateEffectFailure$ = this.actions$.pipe(
      ofType(MailTemplatesActions.UPDATE_MAIL_TEMPLATE_FAILURE),
      map((action: ActionWithPayload<IMailTemplatesPayload>) => ({...action.payload})),
      switchMap(() => {
          this._snackBar.open('Ошибка при обновлении шаблона', 'OK', {
            duration: 5 * 1000
          });
          return of(EMPTY_ACTION);
        }
      )
    );

    /************************************************************************************
     * Update Template In Mail Template
     ************************************************************************************/
    this.updateTemplateInMailTemplateEffect$ = this.actions$.pipe(
      ofType(MailTemplatesActions.UPDATE_TEMPLATE_IN_MAIL_TEMPLATE),
      map((action: ActionWithPayload<IMailTemplatesPayload>) => ({...action.payload})),
      switchMap(({mailTemplateId, template}: { mailTemplateId: number, template: string }) =>
        this.mailTemplatesService.updateTemplateInMailTemplate(mailTemplateId, template)
          .pipe(
            map((updatedMailTemplate: IMailTemplate) => this.mailTemplatesActions.updateTemplateInMailTemplateSuccess(updatedMailTemplate)),
            catchError((errorResponse: HttpErrorResponse) =>
              of(this.mailTemplatesActions.updateTemplateInMailTemplateFailure(errorResponse.error.errorCode))
            )
          )
      )
    );

    /************************************************************************************
     * Update Template In Mail Template Success
     ************************************************************************************/
    this.updateTemplateInMailTemplateEffectSuccess$ = this.actions$.pipe(
      ofType(MailTemplatesActions.UPDATE_TEMPLATE_IN_MAIL_TEMPLATE_SUCCESS),
      map((action: ActionWithPayload<IMailTemplatesPayload>) => ({...action.payload})),
      switchMap(() => {
          this._snackBar.open('Шаблон обновлён', 'OK', {
            duration: 5 * 1000
          });
          return of(EMPTY_ACTION);
        }
      )
    );

    /************************************************************************************
     * Update Template In Mail Template Failure
     ************************************************************************************/
    this.updateTemplateInMailTemplateEffectFailure$ = this.actions$.pipe(
      ofType(MailTemplatesActions.UPDATE_TEMPLATE_IN_MAIL_TEMPLATE_FAILURE),
      map((action: ActionWithPayload<IMailTemplatesPayload>) => ({...action.payload})),
      switchMap(() => {
          this._snackBar.open('Ошибка при обновлении шаблона', 'OK', {
            duration: 5 * 1000
          });
          return of(EMPTY_ACTION);
        }
      )
    );

    /************************************************************************************
     * Delete Mail Template
     ************************************************************************************/
    this.deleteMailTemplateEffect$ = this.actions$.pipe(
      ofType(MailTemplatesActions.DELETE_MAIL_TEMPLATE),
      map((action: ActionWithPayload<IMailTemplatesPayload>) => ({...action.payload})),
      switchMap(({mailTemplateId}: { mailTemplateId: number }) =>
        this.mailTemplatesService.deleteMailTemplate(mailTemplateId)
          .pipe(
            map((updatedMailTemplate: IMailTemplate) => this.mailTemplatesActions.deleteMailTemplateSuccess(updatedMailTemplate)),
            catchError((errorResponse: HttpErrorResponse) =>
              of(this.mailTemplatesActions.deleteMailTemplateFailure(errorResponse.error.errorCode))
            )
          )
      )
    );

    /************************************************************************************
     * Delete Mail Template Success
     ************************************************************************************/
    this.deleteMailTemplateEffectSuccess$ = this.actions$.pipe(
      ofType(MailTemplatesActions.DELETE_MAIL_TEMPLATE_SUCCESS),
      map((action: ActionWithPayload<IMailTemplatesPayload>) => ({...action.payload})),
      switchMap(() => {
          this._snackBar.open('Шаблон удалён', 'OK', {
            duration: 5 * 1000
          });
          return of(EMPTY_ACTION);
        }
      )
    );

    /************************************************************************************
     * Delete Mail Template Failure
     ************************************************************************************/
    this.deleteMailTemplateEffectFailure$ = this.actions$.pipe(
      ofType(MailTemplatesActions.DELETE_MAIL_TEMPLATE_FAILURE),
      map((action: ActionWithPayload<IMailTemplatesPayload>) => ({...action.payload})),
      switchMap(() => {
          this._snackBar.open('Ошибка при удалении шаблона', 'OK', {
            duration: 5 * 1000
          });
          return of(EMPTY_ACTION);
        }
      )
    );
  }
}
