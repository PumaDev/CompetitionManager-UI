import { Component, Input, OnInit } from '@angular/core';
import { ICompetition } from '../../../models/competitions.models';

@Component({
  selector: 'app-competition-details',
  templateUrl: './competition-details.component.html',
  styleUrls: ['./competition-details.component.css']
})
export class CompetitionDetailsComponent implements OnInit {

  @Input() competition: ICompetition;

  constructor() { }

  ngOnInit() {
  }

}
