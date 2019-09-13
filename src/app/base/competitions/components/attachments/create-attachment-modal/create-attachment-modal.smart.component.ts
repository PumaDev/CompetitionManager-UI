import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {IAddCategoriesDialogData} from '../../new-competition/add-categories-modal/add-categories.model';
import {CreateAttachment} from '../../../models/attachment.models';
import {Store} from '@ngrx/store';
import {State} from '../../../../../app.reducers';
import {AttachmentsActions} from '../../../actions';

@Component({
  selector: 'app-create-attachment-smart-modal',
  templateUrl: './create-attachment-modal.smart.component.html',
  styleUrls: ['./create-attachment-modal.component.css']
})
export class CreateAttachmentModalSmartComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateAttachmentModalSmartComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IAddCategoriesDialogData,
              private store: Store<State>,
              private attachmentsActions: AttachmentsActions) {
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  createAttachment(createAttachmentView: CreateAttachment) {
    this.store.dispatch(this.attachmentsActions.createAttachment(createAttachmentView));
  }
}
