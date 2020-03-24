import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompetitionPageDesctopComponent } from '../desctop/competition-page.desctop.component';

@Component({
  selector: 'app-competition-page-mobile',
  templateUrl: './competition-page.mobile.component.html',
  styleUrls: ['./competition-page.mobile.component.css']
})
export class CompetitionPageMobileComponent extends CompetitionPageDesctopComponent {
}