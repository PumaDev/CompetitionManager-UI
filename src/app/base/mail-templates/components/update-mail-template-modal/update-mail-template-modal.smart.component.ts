import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {IMailTemplate} from '../../mail-templates.model';
import {UserRole} from '../../../../shared/permissions/models/permission.models';
import {Store} from '@ngrx/store';
import {State} from '../../../../app.reducers';
import {MailTemplatesActions} from '../../actions';

@Component({
  selector: 'app-update-mail-template-smart-modal',
  templateUrl: './update-mail-template-modal.smart.component.html'
})
export class UpdateMailTemplateModalSmartComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UpdateMailTemplateModalSmartComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IUpdateMailTemplateDialogData,
              private store: Store<State>,
              private mailTemplatesActions: MailTemplatesActions) {
  }

  ngOnInit() {
  }

  updateMailTemplate(mailTemplateWithUpdates: IMailTemplate): void {
    this.store.dispatch(this.mailTemplatesActions.updateMailTemplate(mailTemplateWithUpdates));
    this.close();
  }

  updateTemplateInMailTemplate(mailTemplateWithUpdates: IMailTemplate): void {
    this.store.dispatch(
      this.mailTemplatesActions.updateTemplateInMailTemplate(mailTemplateWithUpdates.id, mailTemplateWithUpdates.template));
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}

export interface IUpdateMailTemplateDialogData {
  mailTemplate: IMailTemplate;
  userRole: UserRole;
}
