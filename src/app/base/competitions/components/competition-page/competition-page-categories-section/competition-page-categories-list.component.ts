import {Component, Input, OnInit} from '@angular/core';
import {ICompetitionCategory} from '../../../models/category.model';
import {PageState, PageLoadInfo} from '../../../../../shared/paginator/model';

@Component({
  selector: 'app-competition-page-categories-list',
  templateUrl: './competition-page-categories-list.component.html',
  styleUrls: ['./competition-page-categories-list.component.css']
})
export class CompetitionPageCategoriesListComponent implements OnInit {

  @Input() set categories(categories: ICompetitionCategory[]) {
    this.pageState = new PageState(categories.length, 5, this.pageState ? this.pageState.currentPage : 1);
    this._allCategories = categories;
    if (categories.length > 0) {
      this._categories = categories.slice(this.pageState.firstDisplayElement - 1, this.pageState.lastDisplayElement);
    }
  }

  get categories() {
    return this._categories;
  }

  pageState: PageState;

  private _allCategories: ICompetitionCategory[] = [];
  private _categories: ICompetitionCategory[];

  constructor() {
  }

  ngOnInit() {
  }

  onPageNumberChange(pageLoadInfo: PageLoadInfo) {
    this._categories = this._allCategories.slice(pageLoadInfo.offset, pageLoadInfo.offset + pageLoadInfo.size);
  }
}
