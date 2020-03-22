import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICreateUserView } from '../../../model/registration.models';
import { IUser } from '../../../../shared/permissions/models/permission.models';
import { ActionState } from '../../../../shared/general/general.models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() createdUser: IUser;
  @Input() userCreationState: ActionState;
  @Input() error: number;

  @Output() onCreateUser = new EventEmitter<ICreateUserView>();

  registrateForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.registrateForm = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      mail: new FormControl(null, [Validators.required, Validators.email]),
      clubName: new FormControl(null, [Validators.required])
    });
  }

  register() {
    const createUserView: ICreateUserView = {
      login: this.registrateForm.value.login,
      password: this.registrateForm.value.password,
      mail: this.registrateForm.value.mail,
      clubName: this.registrateForm.value.clubName
    };

    this.onCreateUser.emit(createUserView);
  }

  isRegistrationSuccess() {
    return this.userCreationState == ActionState.SUCCEEDED;
  }

  isRegistrationInProgress() {
    return this.userCreationState == ActionState.IN_PROGRESS;
  }

  isRegistrateButtonDisabled(): boolean {
    return this.userCreationState == ActionState.IN_PROGRESS || !this.registrateForm.valid;
  }
}
