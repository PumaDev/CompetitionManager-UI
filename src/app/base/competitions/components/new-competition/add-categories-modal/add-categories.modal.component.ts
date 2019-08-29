import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ICompetitionCategory} from '../../../models/category.model';
import {FormControl, FormGroup} from '@angular/forms';
import {deepCloneMerge} from '../../../../../shared/utils/redux.utils';

@Component({
  selector: 'app-add-categories-modal',
  templateUrl: './add-categories.modal.component.html',
  styleUrls: ['./add-categories.modal.component.css']
})
export class AddCategoriesModalComponent implements OnInit {

  @Input() set allCategories(allCategories: ICompetitionCategory[]) {
    this._allCategories = allCategories;
    this.updateAllCheckableCategories();
  }

  @Input() set selectedCategories(selectedCategories: ICompetitionCategory[]) {
    this._selectedCategories = selectedCategories;
    this.updateAllCheckableCategories();
  }

  @Output() onCancel = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<ICompetitionCategory[]>();

  allCheckableCategories: CheckableCategory[];
  shownCheckableCategories: CheckableCategory[];

  private _allCategories: ICompetitionCategory[];
  private _selectedCategories: ICompetitionCategory[];

  private _filterKeyword: string;

  filterFormGroup: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.filterFormGroup = new FormGroup({
      filter: new FormControl(null)
    });
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

  updateAllCheckableCategories() {
    let selectedByCategoryId = {};

    if (this._selectedCategories) {
      this._selectedCategories.forEach((selectedCategory) => {
        selectedByCategoryId[selectedCategory.id] = true;
      });
    }

    this.allCheckableCategories = this._allCategories.map((category: ICompetitionCategory) =>
      new CheckableCategory(selectedByCategoryId[category.id] === true, category));

    this.updateShownCategories();
  }

  filterCompetitions(): void {
    this._filterKeyword = this.filterFormGroup.value.filter;

    this.updateShownCategories();
  }

  updateShownCategories() {
    const filterKeyword: string = this._filterKeyword ? this._filterKeyword.toLowerCase() : null;

    this.shownCheckableCategories = this._filterKeyword && this._filterKeyword.length > 0 ?
      this.allCheckableCategories.filter((cat) => this.isNameMappedToFilterKeyword(cat.category.displayName.toLowerCase(), filterKeyword)) :
      this.allCheckableCategories;
  }

  isNameMappedToFilterKeyword(displayName: string, filterKeyword: string): boolean {
    const filterKeywords: string[] = filterKeyword.split(' ');
    return filterKeywords.find((filterWord) => displayName.indexOf(filterWord) < 0) === undefined;
  }
}

class CheckableCategory {
  isChecked: boolean;
  category: ICompetitionCategory;

  constructor(isChecked: boolean, category: ICompetitionCategory) {
    this.isChecked = isChecked;
    this.category = category;
  }
}
