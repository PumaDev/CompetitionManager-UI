import { Component, Input, OnInit } from '@angular/core';
import { ICompetitionCategory } from '../../../models/category.model';
import { PageState } from './paginator/paginator.component';

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

  constructor() { }

  ngOnInit() {
  }

  nextPage() {
    this.pageState = this.pageState.nextPage();
    this._categories = this._allCategories.slice(this.pageState.firstDisplayElement - 1, this.pageState.lastDisplayElement);
  }

  previousPage() {
    this.pageState = this.pageState.previousPage();
    this._categories = this._allCategories.slice(this.pageState.firstDisplayElement - 1, this.pageState.lastDisplayElement);
  }
}
