import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GeneratedCompetitionGrid, ICompetition} from '../../../models/competitions.models';
import {UserRole} from '../../../../../shared/permissions/models/permission.models';
import {competitionsConfig} from '../../../service/competitions.config';
import {ActionState} from '../../../../../shared/general/general.models';
import {appConfig} from '../../../../../app.config';
import {DialogPosition, MatDialog, MatDialogConfig} from '@angular/material';
import {DeleteEntityDialog} from '../../../../dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-competition-details',
  templateUrl: './competition-details.component.html',
  styleUrls: ['./competition-details.component.css']
})
export class CompetitionDetailsComponent implements OnInit {

  @Input() set competition(competition: ICompetition) {
    this._competition = competition;
    if (competition !== null && competition !== undefined) {
      this.generateGridLink = competitionsConfig.generateGrid.replace('{competitionId}', this.competition.id.toString());
    }
  }

  @Input() userRole: UserRole;
  @Input() generatedCompetitionGrid: GeneratedCompetitionGrid;
  @Input() generateGridState: ActionState;
  serverHost: String = appConfig.host;

  @Output() generateGridEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() deleteCompetition: EventEmitter<number> = new EventEmitter<number>();

  public generateGridLink: string;
  private _competition: ICompetition;

  get competition(): ICompetition {
    return this._competition;
  }

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  showGenerateGridButton(): boolean {
    return this.userRole === UserRole.ADMIN || this.userRole === UserRole.DEVELOPER;
  }

  isGridGenerationInProcess(): boolean {
    return this.generateGridState === ActionState.IN_PROGRESS;
  }

  isGridGenerationComplete(): boolean {
    return this.generateGridState === ActionState.SUCCEEDED &&
      this.generatedCompetitionGrid !== undefined && this.generatedCompetitionGrid !== null;
  }

  generateGrid(): void {
    this.generateGridEvent.emit(this.competition.id);
  }

  buildArchiveLink(): String {
    return this.serverHost + 'competition-archive/' + this.generatedCompetitionGrid.archiveName + '/download';
  }

  canManageCompetitionRegistrationStatus(): boolean {
    return this.userRole === UserRole.ADMIN;
  }

  canShowDeleteButton(): boolean {
    return this.userRole === UserRole.ADMIN;
  }

  onDeleteCompetition(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      entityType: 'Соревнования',
      entityName: this.competition.name
    };

    const dialogRef = this.dialog.open(DeleteEntityDialog, dialogConfig);

    dialogRef.afterClosed().subscribe((userConfirmedDeleting: boolean) => {
      console.log('The delete dialog was closed: ' + userConfirmedDeleting);
      if (userConfirmedDeleting) {
        this.deleteCompetition.emit(this.competition.id);
      }
    });
  }
}
