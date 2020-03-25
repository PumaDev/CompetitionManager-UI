import { Component} from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewCompetitionsComponent } from '../new-competitions.component';

@Component({
  selector: 'app-new-competition-mobile',
  templateUrl: '../new-competitions.component.html',
  styleUrls: ['../new-competitions.component.css', './new-competitions.mobile.component.css']
})
export class NewCompetitionsMobileComponent extends NewCompetitionsComponent {

  constructor(private dialog2: MatDialog) {
    super(dialog2);
  }
}
