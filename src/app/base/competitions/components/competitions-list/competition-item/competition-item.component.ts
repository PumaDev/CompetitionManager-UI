import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICompetition, RegistrationStatus } from '../../../models/competitions.models';
import { isMobileVersion } from 'src/app/shared/screen-state/mobile.state';

@Component({
  selector: 'app-competition-item',
  templateUrl: './competition-item.component.html'
})
export class CompetitionItemComponent {

  @Input() competition: ICompetition;
  @Input() canManageRegistrationStatus: boolean = false;
  @Input() canInvitePeople: boolean = false;

  isMobile(): boolean {
    return isMobileVersion();
  }
}
