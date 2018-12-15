import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../../../app.reducers';
import { Observable } from 'rxjs';
import { ICompetitionCategory } from '../../../models/category.model';
import { getCategoriesFromCompetitionSelector } from '../../../reducers/competitions.selector';

@Component({
  selector: 'app-competition-page-categories-list-smart',
  templateUrl: './competition-page-categories-list.smart.component.html'
})
export class CompetitionPageCategoriesListSmartComponent implements OnInit {

  @Input() competitionId: number;

  categories$: Observable<ICompetitionCategory[]> = this.store.pipe(select(getCategoriesFromCompetitionSelector));

  constructor(private store: Store<State>){
  }

  ngOnInit(): void {
  }
}
