import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionState } from '../../../../../shared/general/general.models';
import { select, Store } from '@ngrx/store';
import { State } from '../../../../../app.reducers';
import { CompetitionCategoriesActions } from '../../../actions';
import { MatDialogRef } from '@angular/material';
import { ICompetitionCategory } from '../../../models/category.model';
import { getCompetitionStateSelector } from '../../../reducers/categories.selector';

@Component({
  selector: 'app-create-category-page-smart',
  templateUrl: './create-category-page.smart.component.html',
})
export class CreateCategoryPageSmartComponent implements OnInit {

  savingState$: Observable<ActionState> = this.store.pipe(select(getCompetitionStateSelector));
  wasUploadStart: boolean = false;

  constructor(public dialogRef: MatDialogRef<CreateCategoryPageSmartComponent>,
              private store: Store<State>,
              private categoriesActions: CompetitionCategoriesActions) {

    this.savingState$.subscribe((status) => {
      if (status === ActionState.SUCCEEDED  && this.wasUploadStart) {
        this.close();
      }
    });
  }

  ngOnInit(): void {
    this.wasUploadStart = false;
  }

  close() {
    this.dialogRef.close();
  }

  save(newCategory: ICompetitionCategory) {
    this.wasUploadStart = true;
    this.store.dispatch(this.categoriesActions.createCompetitionCategory(newCategory));
  }
}
