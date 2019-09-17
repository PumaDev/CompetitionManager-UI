import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ActionWithPayload, EMPTY_ACTION} from '../../../shared/utils/redux.utils';
import {ICompetitionPayload} from '../actions/competitions.actions';
import {Store} from '@ngrx/store';
import {State} from '../../../app.reducers';
import {AttachmentsActions} from '../actions';
import {AttachmentsService} from '../service/attachments.service';
import {catchError, map, switchMap} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {IAttachmentsPayload} from '../actions/attachments.actions';
import {CreateAttachment, IAttachment} from '../models/attachment.models';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class AttachmentsEffects {

  @Effect() loadAttachmentsForCompetitionEffect$;
  @Effect() createAttachmentEffect$;
  @Effect() createAttachmentSuccessEffect$;
  @Effect() createAttachmentFailureEffect$;
  @Effect() deleteAttachmentEffect$;
  @Effect() deleteAttachmentSuccessEffect$;
  @Effect() deleteAttachmentFailureEffect$;

  constructor(private actions$: Actions<ActionWithPayload<ICompetitionPayload>>,
              private store: Store<State>,
              private attachmentsActions: AttachmentsActions,
              private attachmentsService: AttachmentsService,
              private _snackBar: MatSnackBar) {

    /*****************************************************************************
     * Load Attachments For Competition
     *****************************************************************************/
    this.loadAttachmentsForCompetitionEffect$ = this.actions$.pipe(
      ofType(AttachmentsActions.LOAD_ATTACHMENTS_FOR_COMPETITION),
      map((action: ActionWithPayload<IAttachmentsPayload>) => ({...action.payload})),
      switchMap(({competitionId}: { competitionId: number }) =>
        this.attachmentsService.getAttachmentsForCompetition(competitionId)
          .pipe(
            map((attachments: IAttachment[]) => this.attachmentsActions.loadAttachmentsForCompetitionSuccess(attachments)),
            catchError((errorResponse: HttpErrorResponse) =>
              of(this.attachmentsActions.loadAttachmentsForCompetitionFailure(errorResponse.error.errorCode ?
                errorResponse.error.errorCode :
                500))
            )
          )
      )
    );

    /*****************************************************************************
     * Create Attachment
     *****************************************************************************/
    this.createAttachmentEffect$ = this.actions$.pipe(
      ofType(AttachmentsActions.CREATE_ATTACHMENT),
      map((action: ActionWithPayload<IAttachmentsPayload>) => ({...action.payload})),
      switchMap(({createAttachment}: { createAttachment: CreateAttachment }) =>
        this.attachmentsService.createAttachment(createAttachment)
          .pipe(
            map((attachment: IAttachment) => this.attachmentsActions.createAttachmentSuccess(attachment)),
            catchError((errorResponse: HttpErrorResponse) =>
              of(this.attachmentsActions.createAttachmentFailure(errorResponse.error.errorCode ?
                errorResponse.error.errorCode :
                500))
            )
          )
      )
    );

    /*****************************************************************************
     * Create Attachment Success
     *****************************************************************************/
    this.createAttachmentSuccessEffect$ = this.actions$.pipe(
      ofType(AttachmentsActions.CREATE_ATTACHMENT_SUCCESS),
      switchMap(({}: {}) => {
        this._snackBar.open('Вложение сохранено', 'OK', {
          duration: 5 * 1000
        });
        return of(EMPTY_ACTION);
        }
      )
    );

    /*****************************************************************************
     * Create Attachment Failure
     *****************************************************************************/
    this.createAttachmentFailureEffect$ = this.actions$.pipe(
      ofType(AttachmentsActions.CREATE_ATTACHMENT_FAILURE),
      switchMap(({}: {}) => {
          this._snackBar.open('При сохранении вложения произошла ошибка', 'OK', {
            duration: 5 * 1000
          });
          return of(EMPTY_ACTION);
        }
      )
    );

    /*****************************************************************************
     * Delete Attachment
     *****************************************************************************/
    this.deleteAttachmentEffect$ = this.actions$.pipe(
      ofType(AttachmentsActions.DELETE_ATTACHMENT),
      map((action: ActionWithPayload<IAttachmentsPayload>) => ({...action.payload})),
      switchMap(({competitionId, attachmentId}: { competitionId: number, attachmentId: number }) =>
        this.attachmentsService.deleteAttachmentById(competitionId, attachmentId)
          .pipe(
            map(() => this.attachmentsActions.deleteAttachmentSuccess(attachmentId)),
            catchError((errorResponse: HttpErrorResponse) =>
              of(this.attachmentsActions.deleteAttachmentFailure(errorResponse.error.errorCode ?
                errorResponse.error.errorCode :
                500))
            )
          )
      )
    );

    /*****************************************************************************
     * Delete Attachment Success
     *****************************************************************************/
    this.deleteAttachmentSuccessEffect$ = this.actions$.pipe(
      ofType(AttachmentsActions.DELETE_ATTACHMENT_SUCCESS),
      switchMap(({}: {}) => {
          this._snackBar.open('Вложение удалено', 'OK', {
            duration: 5 * 1000
          });
          return of(EMPTY_ACTION);
        }
      )
    );

    /*****************************************************************************
     * Delete Attachment Failure
     *****************************************************************************/
    this.deleteAttachmentFailureEffect$ = this.actions$.pipe(
      ofType(AttachmentsActions.DELETE_ATTACHMENT_FAILURE),
      switchMap(({}: {}) => {
          this._snackBar.open('При удалении вложения произошла ошибка', 'OK', {
            duration: 5 * 1000
          });
          return of(EMPTY_ACTION);
        }
      )
    );
  }
}
