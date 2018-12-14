import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICompetitionCategory } from '../../../models/category.model';

@Component({
  selector: 'app-add-categories-modal',
  templateUrl: './add-categories.modal.component.html',
  styleUrls: ['./add-categories.modal.component.css']
})
export class AddCategoriesModalComponent implements OnInit {

  @Input() set allCategories(allCategories: ICompetitionCategory[]) {
    this._allCategories = allCategories;
    this.updateCheckedCategories();
  }

  @Input() set selectedCategories(selectedCategories: ICompetitionCategory[]) {
    this._selectedCategories = selectedCategories;
    this.updateCheckedCategories();
  }

  @Output() onCancel = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<ICompetitionCategory[]>();

  allCheckableCategories: CheckableCategory[];

  private _allCategories: ICompetitionCategory[];
  private _selectedCategories: ICompetitionCategory[];

  constructor() { }

  ngOnInit() {
  }

  cancel() {
    this.onCancel.emit();
  }

  save() {
    const checkedCategories = this.allCheckableCategories
      .filter((checkedCategory) => checkedCategory.isChecked)
      .map((checkedCategory) => checkedCategory.category);

    this.onSave.emit(checkedCategories);
  }

  updateCheckedCategories() {
    let selectedByCategoryId = {};

    if (this._selectedCategories) {
      this._selectedCategories.forEach((selectedCategory) => {
        selectedByCategoryId[selectedCategory.id] = true;
      });
    }

    this.allCheckableCategories = this._allCategories.map((category: ICompetitionCategory) =>
      new CheckableCategory(!!selectedByCategoryId[category.id], category));
  }
}

class CheckableCategory {
  isChecked: boolean;
  category: ICompetitionCategory;

  constructor(isChecked: boolean, category: ICompetitionCategory){
    this.isChecked = isChecked;
    this.category = category;
  }
}
