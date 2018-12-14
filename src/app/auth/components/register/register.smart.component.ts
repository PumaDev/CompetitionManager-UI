import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../app.reducers';
import { RegistrationActions } from '../../actions/register/registration.actions';
import { Observable } from 'rxjs';
import { IUser } from '../../../shared/permissions/models/permission.models';
import {
  getActionStateOfUserCreationSelector,
  getCreatedUserSelector,
  getErrorCodeOfUserCreationSelector
} from '../../actions/register/registrate.selector';
import { ActionState } from '../../../shared/general/general.models';
import { ICreateUserView } from '../../model/registration.models';

@Component({
  selector: 'app-register-smart',
  templateUrl: './register.smart.component.html'
})
export class RegisterSmartComponent {

  createdUser$: Observable<IUser> = this.store.pipe(select(getCreatedUserSelector));
  userCreationState$: Observable<ActionState> = this.store.pipe(select(getActionStateOfUserCreationSelector));
  userCreationError$: Observable<number> = this.store.pipe(select(getErrorCodeOfUserCreationSelector));

  constructor(private store: Store<State>,
              private registrationActions: RegistrationActions) {
  }

  createUser(newUser: ICreateUserView) {
    this.store.dispatch(this.registrationActions.createUser(newUser));
  }
}
