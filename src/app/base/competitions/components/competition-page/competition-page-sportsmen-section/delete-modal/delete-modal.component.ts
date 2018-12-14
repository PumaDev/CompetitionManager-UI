import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ISportsman } from '../../../../models/sportmen.models';

@Component({
  selector: 'delete-sportsman-from-list-modal-dialog',
  templateUrl: './delete-modal.component.html'
})
export class DeleteSportsmanFromLisModalDialog {

  constructor(
    public dialogRef: MatDialogRef<DeleteSportsmanFromLisModalDialog>,
    @Inject(MAT_DIALOG_DATA) public sportsman: ISportsman) {
  }
}
