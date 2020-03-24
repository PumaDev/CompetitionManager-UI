import { Component } from '@angular/core';
import { CompetitionDetailsComponent } from '../competition-details.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-competition-details-mobile',
  templateUrl: './competition-details.mobile.component.html',
  styleUrls: ['./competition-details.mobile.component.css']
})
export class CompetitionDetailsMobileComponent extends CompetitionDetailsComponent  {

  constructor(public dialog2: MatDialog,
              private _snackBar2: MatSnackBar) {
                super(dialog2, _snackBar2);
  }
}
