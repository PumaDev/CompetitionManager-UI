import { Component, Inject, OnInit } from '@angular/core';
import { IAddCategoriesDialogData } from './add-categories.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { ICompetitionCategory } from '../../../models/category.model';
import { select, Store } from '@ngrx/store';
import { State } from '../../../../../app.reducers';
import { getCompetitionCategoriesSelector } from '../../../reducers/categories.selector';
import { CompetitionCategoriesActions } from '../../../actions';

@Component({
  selector: 'app-add-categories-smart-modal',
  templateUrl: './add-categories.modal.smart.component.html'
})
export class AddCategoriesModalSmartComponent implements OnInit {

  allCompetitionCategories$: Observable<ICompetitionCategory[]> = this.store.pipe(select(getCompetitionCategoriesSelector));

  constructor(public dialogRef: MatDialogRef<AddCategoriesModalSmartComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IAddCategoriesDialogData,
              private store: Store<State>,
              private categoriesActions: CompetitionCategoriesActions) {
  }

  ngOnInit() {
    this.store.dispatch(this.categoriesActions.loadCompetitionCategories());
  }

  cancel() {
    this.dialogRef.close();
  }

  save(selectedCategories: ICompetitionCategory[]) {
    this.dialogRef.close(selectedCategories);
  }
}
