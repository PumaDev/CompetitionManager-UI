import { Component, Inject, OnInit } from '@angular/core';
import { IAddCategoriesDialogData } from './add-categories.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-categories-smart-modal',
  templateUrl: './add-categories.modal.smart.component.html'
})
export class AddCategoriesModalSmartComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddCategoriesModalSmartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IAddCategoriesDialogData) {
    this.dialogRef.updatePosition({ top: '50px', left: '50px' });
    this.dialogRef.updateSize('250px', '400px');
  }

  ngOnInit() {
  }

}
