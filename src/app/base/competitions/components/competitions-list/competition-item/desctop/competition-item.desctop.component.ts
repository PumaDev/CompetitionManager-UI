import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICompetition, RegistrationStatus } from '../../../../models/competitions.models';

@Component({
  selector: 'app-competition-item-desctop',
  templateUrl: './competition-item.desctop.component.html',
  styleUrls: ['./competition-item.desctop.component.css']
})
export class CompetitionItemDesctopComponent implements OnInit {

  @Input() competition: ICompetition;
  @Input() canManageRegistrationStatus: boolean = false;
  @Input() canInvitePeople: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  isOneDateCompetition(): boolean {
    return !this.competition.endDate || this.competition.startDate === this.competition.endDate;
  }

  isRegistrationOpen(): boolean {
    return [RegistrationStatus.OPEN, RegistrationStatus.REOPEN].indexOf(this.competition.registrationStatus) >= 0;
  }
}
