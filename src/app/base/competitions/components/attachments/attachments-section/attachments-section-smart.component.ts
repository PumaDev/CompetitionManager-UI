import {Component, Input} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../../app.reducers';
import {AttachmentsActions} from '../../../actions';
import {CreateAttachment, IAttachment} from '../../../models/attachment.models';
import {Observable} from 'rxjs';
import {getAttachmentsSelector, getLoadAttachmentsActionStateSelector} from '../../../reducers/attachments.selectors';
import {ActionState} from '../../../../../shared/general/general.models';

@Component({
  selector: 'app-attachments-section-smart',
  templateUrl: './attachments-section-smart.component.html'
})
export class AttachmentsSectionSmartComponent {

  @Input() set competitionId(competitionId: number) {
    if (competitionId !== undefined && competitionId !== null && competitionId !== 0) {
      this._competitionId = competitionId;
      this.loadAttachments();
    }
  }

  get competitionId(): number {
    return this._competitionId;
  }

  attachments$: Observable<IAttachment[]> = this.store.pipe(select(getAttachmentsSelector));
  loadAttachmentsActionState$: Observable<ActionState> = this.store.pipe(select(getLoadAttachmentsActionStateSelector));

  private _competitionId: number;

  constructor(private store: Store<State>,
              private attachmentsActions: AttachmentsActions) {
  }

  loadAttachments() {
    this.store.dispatch(this.attachmentsActions.loadAttachmentsForCompetition(this.competitionId));
  }

  deleteAttachment(attachmentId: number) {
    this.store.dispatch(this.attachmentsActions.deleteAttachment(this.competitionId, attachmentId));
  }
}
