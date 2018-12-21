import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISportsman, Male } from '../../../models/sportmen.models';
import { ActionState } from '../../../../../shared/general/general.models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { State } from '../../../../../app.reducers';
import { getAddSportsmenActionStateSelector } from '../../../reducers/sportsmen.selector';
import { MatDialog } from '@angular/material';
import { DeleteSportsmanFromLisModalDialog } from './delete-modal/delete-modal.component';
import { RegistrationStatus } from '../../../models/competitions.models';
import { UserRole } from '../../../../../shared/permissions/models/permission.models';

@Component({
  selector: 'app-competition-page-sportsmen-section',
  templateUrl: './competition-page-sportsmen-section.component.html',
  styleUrls: ['./competition-page-sportsmen-section.component.css']
})
export class CompetitionPageSportsmenSectionComponent implements OnInit {

  @Input() sportsmen: ISportsman[];
  @Input() loadState: ActionState;
  @Input() addState: ActionState;
  @Input() deleteState: ActionState;
  @Input() errorCode: number;
  @Input() competitionRegistrationStatus: RegistrationStatus;
  @Input() userRole: UserRole;
  @Input() sections: string[];

  @Output() onAddSportsman = new EventEmitter<ISportsman>();
  @Output() onDeleteSportsman = new EventEmitter<number>();

  sportsmanForm: FormGroup;

  male = Male.MALE;
  female = Male.FEMALE;

  constructor(private store: Store<State>,
              private dialog: MatDialog) {
    this.initForm();
    this.store.pipe(select(getAddSportsmenActionStateSelector)).subscribe(
      (state: ActionState) => {
        if (state === ActionState.SUCCEEDED) {
          this.initForm();
        }
      }
    );
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    let coach: string = null;
    let section: string = null;
    if (this.sportsmanForm) {
      coach = this.sportsmanForm.value.coach.trim();
      section = this.sportsmanForm.value.section;
    }
    this.sportsmanForm = new FormGroup({
      male: new FormControl(Male.MALE, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      age: new FormControl(null, [Validators.required, Validators.pattern('\\d{1,2}')]),
      weight: new FormControl(null, [Validators.required, Validators.pattern('\\d{2,3}(\\.\\d)?')]),
      experience: new FormControl(null, [Validators.required, Validators.pattern('\\d{1,2}')]),
      coach: new FormControl(coach, [Validators.required]),
      section: new FormControl(section, [Validators.required])
    });
  }

  isSportsmanSaveInProgress(): boolean {
    return this.addState === ActionState.IN_PROGRESS;
  }

  isSportsmanSaveFailed(): boolean {
    return this.addState === ActionState.FAILED;
  }

  iSportsmenListLoading(): boolean {
    return this.loadState === ActionState.IN_PROGRESS;
  }

  isSportsmanListEmpty(): boolean {
    return this.loadState === ActionState.SUCCEEDED && this.sportsmen.length === 0;
  }

  addSportsman() {
    const newSportsman: ISportsman = <ISportsman>{
      name: this.sportsmanForm.value.name.trim(),
      lastName: this.sportsmanForm.value.lastName.trim(),
      male: this.sportsmanForm.value.male,
      age: Number(this.sportsmanForm.value.age),
      weight: Number(this.sportsmanForm.value.weight),
      experience: Number(this.sportsmanForm.value.experience),
      coach: this.sportsmanForm.value.coach.trim(),
      section: this.sportsmanForm.value.section
    };

    this.onAddSportsman.emit(newSportsman);
  }

  isAddButtonDisabled(): boolean {
    return this.addState === ActionState.IN_PROGRESS || !this.sportsmanForm.valid;
  }

  deleteSportsman(sportsman: ISportsman) {
    const dialogRef = this.dialog.open(DeleteSportsmanFromLisModalDialog, {
      data: sportsman
    });

    dialogRef.afterClosed().subscribe(userWhantToDeleteSportsman => {
      if (userWhantToDeleteSportsman) {
        this.onDeleteSportsman.emit(sportsman.id);
      }
    });
  }

  canRegistrateSportsman(): boolean {
    return this.competitionRegistrationStatus !== RegistrationStatus.CLOSED && this.userRole === UserRole.COACH;
  }

  isRegistrationClosed(): boolean {
    return this.competitionRegistrationStatus === RegistrationStatus.CLOSED;
  }
}
