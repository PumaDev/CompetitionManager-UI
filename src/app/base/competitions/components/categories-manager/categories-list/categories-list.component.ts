import { Component, Input, OnInit } from '@angular/core';
import { ICompetitionCategory } from '../../../models/category.model';
import { ActionState } from '../../../../../shared/general/general.models';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  @Input() categories: ICompetitionCategory[];
  @Input() loadState: ActionState;

  constructor() { }

  ngOnInit() {
  }

  wasCategoriesSuccessfullyLoaded() {
    return this.loadState === ActionState.SUCCEEDED;
  }

  wasCategoriesFailuryLoaded() {
    return this.loadState === ActionState.FAILED;
  }

  isLoadingInProcess() {
    return this.loadState === ActionState.IN_PROGRESS || this.loadState === ActionState.INITIAL;
  }
}
