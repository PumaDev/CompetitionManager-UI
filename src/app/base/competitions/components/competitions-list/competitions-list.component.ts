import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ICompetition} from '../../models/competitions.models';
import {PageLoadInfo, PageState} from '../../../../shared/paginator/model';
import {createEmptyPageResponse, IPageResponse} from '../../../../shared/general/general.models';

@Component({
  selector: 'app-competitions-list',
  templateUrl: './competitions-list.component.html',
  styleUrls: ['./competitions-list.component.css']
})
export class CompetitionsListComponent {

  pageState: PageState;

  @Input() pageNumber: number;

  @Input() set competitions (competitions: IPageResponse<ICompetition>) {
    this._competitionsPage = competitions;
    this.pageState = new PageState(competitions.totalElements, 10, this.pageNumber);
  }

  @Input() canManageRegistrationStatus = false;
  @Input() canInvitePeople = false;

  _competitionsPage: IPageResponse<ICompetition> = createEmptyPageResponse<ICompetition>();

  @Output() changePage: EventEmitter<PageLoadInfo> = new EventEmitter<PageLoadInfo>();

  onChangePageState(pageLoadInfo: PageLoadInfo): void {
    this.changePage.emit(pageLoadInfo);
  }
}
