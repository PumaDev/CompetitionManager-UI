import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IUpdateUserPasswordView, IUser} from '../../models/users.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  @Input() set user(user: IUser) {
    this._user = user;

    if (user) {
      this.updateUserFormGroup = new FormGroup({
        login: new FormControl(user.login, Validators.required),
        mail: new FormControl(user.mail, [Validators.required, Validators.email]),
        clubName: new FormControl(user.clubName, Validators.required)
      });
    }
  }

  @Output() updateUser: EventEmitter<IUser> = new EventEmitter<IUser>();
  @Output() updateUserPassword: EventEmitter<IUpdateUserPasswordView> = new EventEmitter<IUpdateUserPasswordView>();

  updateUserFormGroup: FormGroup;
  updatePasswordFormGroup: FormGroup;

  private _user: IUser;

  constructor() {
  }

  ngOnInit() {
    this.updatePasswordFormGroup = new FormGroup({
      oldPassword: new FormControl(null, Validators.required),
      newPassword: new FormControl(null, Validators.required)
    });
  }

  saveUpdates() {
    const updatedUser: IUser = <IUser>{
      id: this._user.id,
      login: this.updateUserFormGroup.value.login,
      mail: this.updateUserFormGroup.value.mail,
      clubName: this.updateUserFormGroup.value.clubName,
    };

    this.updateUser.emit(updatedUser);
  }

  updatePassword() {
    const updateUserPasswordView: IUpdateUserPasswordView = <IUpdateUserPasswordView>{
      oldPassword: this.updatePasswordFormGroup.value.oldPassword,
      newPassword: this.updatePasswordFormGroup.value.newPassword
    };

    this.updateUserPassword.emit(updateUserPasswordView);
  }
}
