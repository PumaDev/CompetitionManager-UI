import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICompetition, RegistrationStatus } from '../../../../models/competitions.models';
import { CompetitionItemDesctopComponent } from '../desctop/competition-item.desctop.component';

@Component({
  selector: 'app-competition-item-mobile',
  templateUrl: './competition-item.mobile.component.html',
  styleUrls: ['./competition-item.mobile.component.css']
})
export class CompetitionItemMobileComponent extends CompetitionItemDesctopComponent {
}
