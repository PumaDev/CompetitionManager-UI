import { Component, Input } from '@angular/core';
import { ICompetition } from '../../models/competitions.models';

@Component({
  selector: 'app-competitions-list',
  templateUrl: './competitions-list.component.html',
  styleUrls: ['./competitions-list.component.css']
})
export class CompetitionsListComponent {

  @Input() competitions: ICompetition[] = null;
  @Input() canReopen: boolean = false;
  @Input() canInvitePeople: boolean = false;
}
