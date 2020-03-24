import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../../../../../../app.reducers';
import {MatDialog} from '@angular/material';
import { CompetitionPageSportsmenSectionComponent } from '../competition-page-sportsmen-section.component';

@Component({
  selector: 'app-competition-page-sportsmen-section-mobile',
  templateUrl: './competition-page-sportsmen-section.mobile.component.html',
  styleUrls: ['./competition-page-sportsmen-section.mobile.component.css']
})
export class CompetitionPageSportsmenSectionMobileComponent extends CompetitionPageSportsmenSectionComponent {

  constructor(private store2: Store<State>,
              private dialog2: MatDialog) {
                super(store2, dialog2);
   
  }
}
