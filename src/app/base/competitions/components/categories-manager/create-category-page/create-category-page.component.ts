import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionState } from '../../../../../shared/general/general.models';
import { ICompetitionCategory } from '../../../models/category.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-category-page',
  templateUrl: './create-category-page.component.html',
  styleUrls: ['./create-category-page.component.css']
})
export class CreateCategoryPageComponent implements OnInit {

  @Input() savingState: ActionState;
  @Input() wasUploadStart: boolean = false;

  @Output() onCategorySave = new EventEmitter<ICompetitionCategory>();
  @Output() onClose = new EventEmitter<void>();

  categoryForm: FormGroup;

  constructor() {
    this.initCategoryFormGroup();
  }

  ngOnInit() {
  }

  initCategoryFormGroup() {
    this.categoryForm = new FormGroup({
    /*  displayName: new FormControl(null, [Validators.required]),
      minAge: new FormControl(null, [Validators.min(0), Validators.max(100)]),
      maxAge: new FormControl(null, [Validators.min(0), Validators.max(100)]),
      minWeight: new FormControl(null, [Validators.min(0), Validators.max(150)]),
      maxWeight: new FormControl(null, [Validators.min(0), Validators.max(150)]),
      minExperience: new FormControl(null, [Validators.min(0), Validators.max(100)]), */
      maxExperience: new FormControl(null)
    });
  }

  isSaveInProcess(): boolean {
    return this.savingState === ActionState.IN_PROGRESS;
  }

  isSavingStateFailed(): boolean {
    return this.wasUploadStart && this.savingState === ActionState.FAILED;
  }

  save() {
    const category = <ICompetitionCategory> {
      displayName: this.categoryForm.value.displayName,
      lowerAge: this.categoryForm.value.minAge,
      upperAge: this.categoryForm.value.maxAge,
      lowerWeight: this.categoryForm.value.minWeight,
      upperWeight: this.categoryForm.value.maxWeight,
      lowerExperience: this.categoryForm.value.minExperience,
      upperExperience: this.categoryForm.value.maxExperience
    };

    this.onCategorySave.emit(category);
  }

  close() {
    this.onClose.emit();
  }

}
