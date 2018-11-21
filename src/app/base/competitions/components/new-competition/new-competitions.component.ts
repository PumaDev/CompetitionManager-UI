import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionState } from '../../../../shared/general/general.models';
import { ICompetition } from '../../models/competitions.models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AddCategoriesModalSmartComponent } from './add-categories-modal/add-categories.modal.smart.component';

@Component({
  selector: 'app-new-competition',
  templateUrl: './new-competitions.component.html',
  styleUrls: ['./new-competitions.component.css']
})
export class NewCompetitionsComponent implements OnInit {

  @Input() state: ActionState = ActionState.INITIAL;

  @Output() onSave = new EventEmitter<ICompetition>();

  createCompetitionForm: FormGroup;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
    this.setupEmptyForm();
  }

  isUploadInProgress(): boolean {
    return this.state === ActionState.IN_PROGRESS;
  }

  isUploadSuccess(): boolean {
    return this.state === ActionState.SUCCEEDED;
  }

  isUploadFailed(): boolean {
    return this.state === ActionState.FAILED;
  }

  openAddCategoriesDialogModal() {
    this.dialog.open(AddCategoriesModalSmartComponent, {
        data: {selectedCategories: []}
    })
  }

  save() {
    const competition: ICompetition = <ICompetition>{
      name: this.createCompetitionForm.value.name,
      startDate: this.createCompetitionForm.value.startDate,
      endDate: this.createCompetitionForm.value.endDate,
      description: this.createCompetitionForm.value.description
    };
    this.onSave.emit(competition);
  }

  cancel() {
    this.setupEmptyForm();
  }

  private setupEmptyForm() {
    this.createCompetitionForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required]),
      description: new FormControl(null)
    });
  }
}
