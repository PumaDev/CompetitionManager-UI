import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ICompetition, RegistrationStatus} from '../../models/competitions.models';

@Component({
  selector: 'app-competition-registration-status-manager',
  templateUrl: './competition-registration-status-manager.component.html',
  styleUrls: ['./competition-registration-status-manager.component.css']
})
export class CompetitionRegistrationStatusManagerComponent implements OnInit {

  @Input() competition: ICompetition;

  @Input() canManageRegistrationStatus = false;

  @Output() setRegistrationStatus = new EventEmitter<ICompetition>();

  constructor() {
  }

  ngOnInit() {
  }

  canCloseRegistration(): boolean {
    return this.canManageRegistrationStatus && this.competition.registrationStatus !== RegistrationStatus.CLOSED;
  }

  canReopenRegistration(): boolean {
    return this.canManageRegistrationStatus && this.competition.registrationStatus === RegistrationStatus.CLOSED;
  }

  closeRegistration(competitionId: number) {
    this.setRegistrationStatus.emit(<ICompetition>{
      id: competitionId,
      registrationStatus: RegistrationStatus.CLOSED
    });
  }

  reopenRegistration(competitionId: number) {
    this.setRegistrationStatus.emit(<ICompetition>{
      id: competitionId,
      registrationStatus: RegistrationStatus.REOPEN
    });
  }
}
