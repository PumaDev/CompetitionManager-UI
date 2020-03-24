import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-competition-page-desctop',
  templateUrl: './competition-page.desctop.component.html',
  styleUrls: ['./competition-page.desctop.component.css']
})
export class CompetitionPageDesctopComponent {

  @Input() competitionId: number;
}
