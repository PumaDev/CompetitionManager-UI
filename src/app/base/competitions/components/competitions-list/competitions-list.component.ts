import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICompetition } from '../../models/competitions.models';

@Component({
  selector: 'app-competitions-list',
  templateUrl: './competitions-list.component.html',
  styleUrls: ['./competitions-list.component.css']
})
export class CompetitionsListComponent {

  @Input() competitions: ICompetition[] = null;
  @Input() canManageRegistrationStatus: boolean = false;
  @Input() canInvitePeople: boolean = false;

  @Output() onSetRegistrationStatus = new EventEmitter<ICompetition>();

  setRegistrationStatus(competition: ICompetition) {
    this.onSetRegistrationStatus.emit(competition);
  }
}
