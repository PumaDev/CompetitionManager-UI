import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GeneratedCompetitionGrid, ICompetition} from '../../../models/competitions.models';
import {UserRole} from '../../../../../shared/permissions/models/permission.models';
import {competitionsConfig} from '../../../service/competitions.config';
import {ActionState} from '../../../../../shared/general/general.models';
import {appConfig} from '../../../../../app.config';
import {MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';
import {DeleteEntityDialog} from '../../../../dialogs/delete-dialog/delete-dialog.component';
import {EditableState} from '../../../../../shared/edit/model/edit.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-competition-details',
  templateUrl: './competition-details.component.html',
  styleUrls: ['./competition-details.component.css']
})
export class CompetitionDetailsComponent implements OnInit {

  @Input() set competition(competition: ICompetition) {
    this._competition = competition;
    if (competition !== null && competition !== undefined) {
      this.createFormGroup();
      this.generateGridLink = competitionsConfig.generateGrid.replace('{competitionId}', this.competition.id.toString());
    }
  }

  @Input() userRole: UserRole;
  @Input() generatedCompetitionGrid: GeneratedCompetitionGrid;
  @Input() generateGridState: ActionState;
  @Input() set updateCompetitionState(updateCompetitionState: ActionState) {
    if (updateCompetitionState === ActionState.SUCCEEDED) {
      this.editState = EditableState.VIEW;
      this._snackBar.open('Соревнование обновлнено успешно', 'OK', {
        duration: 5 * 1000
      });
    }
    if (updateCompetitionState === ActionState.FAILED) {
      this._snackBar.open('Произошла ошибка. попробуйте ещё раз', 'OK', {
        duration: 5 * 1000
      });
    }
  }
  serverHost: String = appConfig.host;

  @Output() generateGridEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() deleteCompetition: EventEmitter<number> = new EventEmitter<number>();
  @Output() updateCompetition: EventEmitter<ICompetition> = new EventEmitter<ICompetition>();

  editState: EditableState = EditableState.VIEW;
  updateCompetitionFormGroup: FormGroup;

  public generateGridLink: string;
  private _competition: ICompetition;

  get competition(): ICompetition {
    return this._competition;
  }

  constructor(public dialog: MatDialog,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  createFormGroup(): void {
    this.updateCompetitionFormGroup = new FormGroup({
      name: new FormControl(this.competition.name, Validators.required),
      startDate: new FormControl(this.competition.startDate, Validators.required),
      endDate: new FormControl(this.competition.endDate, Validators.required),
      description: new FormControl(this.competition.description)
    });
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

  canShowEditButton(): boolean {
    return (this.userRole === UserRole.ADMIN || this.userRole === UserRole.DEVELOPER) &&
      this.editState !== EditableState.EDIT;
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

  updateToEditState(): void {
    this.editState = EditableState.EDIT;
  }

  isViewState(): boolean {
    return this.editState === EditableState.VIEW;
  }

  isEditState(): boolean {
    return this.editState === EditableState.EDIT;
  }

  saveUpdates(): void {
    const competition: ICompetition = <ICompetition> {};
    competition.name = this.updateCompetitionFormGroup.value.name;
    competition.startDate = new Date(this.updateCompetitionFormGroup.value.startDate);
    competition.endDate = new Date(this.updateCompetitionFormGroup.value.endDate);
    competition.description = this.updateCompetitionFormGroup.value.description;
    competition.registrationStatus = this.competition.registrationStatus;
    competition.id = this.competition.id;

    this.updateCompetition.emit(competition);
  }
}
