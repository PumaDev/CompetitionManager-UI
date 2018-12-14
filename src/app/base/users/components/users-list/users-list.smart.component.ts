import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../../app.reducers';
import { UsersActions } from '../../actions';
import { Observable } from 'rxjs';
import { IUser } from '../../models/users.model';
import { getUsersActionStateSelector, getUsersErrorCodeSelector, getUsersSelector } from '../../selectors/users.selector';
import { ActionState } from '../../../../shared/general/general.models';

@Component({
  selector: 'app-users-list-smart',
  templateUrl: './users-list.smart.component.html'
})
export class UsersListSmartComponent implements OnInit {

  users$: Observable<IUser[]> = this.store.pipe(select(getUsersSelector));
  usersActionState$: Observable<ActionState> = this.store.pipe(select(getUsersActionStateSelector));
  errorCode$: Observable<number> = this.store.pipe(select(getUsersErrorCodeSelector));

  constructor(private store: Store<State>,
              private usersActions: UsersActions) {
  }

  ngOnInit(): void {
    this.store.dispatch(this.usersActions.loadUsers());
  }

  updateActiveStatus(user: IUser) {
    this.store.dispatch(this.usersActions.updateActiveStatus(user.activateStatus, user.id));
  }
}
