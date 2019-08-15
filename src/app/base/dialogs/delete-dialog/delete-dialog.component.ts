import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
// tslint:disable-next-line:component-class-suffix
export class DeleteEntityDialog {

  constructor(
    public dialogRef: MatDialogRef<DeleteEntityDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}

export interface DialogData {
  entityType: String;
  entityName: String;
}
