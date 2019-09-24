import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../../../../app.reducers';
import {MailTemplatesActions} from '../../actions';
import {IMailTemplate} from '../../mail-templates.model';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-create-mail-template-modal-smart',
  templateUrl: './create-mail-template-modal.smart.component.html'
})
export class CreateMailTemplateModalSmartComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateMailTemplateModalSmartComponent>,
              private store: Store<State>,
              private mailTemplateActions: MailTemplatesActions) { }

  ngOnInit() {
  }

  createMailTemplate(newMailTemplate: IMailTemplate): void {
    this.store.dispatch(this.mailTemplateActions.createMailTemplate(newMailTemplate));
  }

  close() {
    this.dialogRef.close();
  }
}
