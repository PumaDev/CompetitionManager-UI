import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.reducers';
import {UsersActions} from '../../actions';
import {IUpdateUserPasswordView, IUser} from '../../models/users.model';
import {Observable} from 'rxjs';
import {getUsersActionStateSelector, getUserSelector} from '../../selectors/users.selector';
import {ActionState} from '../../../../shared/general/general.models';

@Component({
  selector: 'app-profile-page-smart',
  templateUrl: './profile-page.smart.component.html'
})
export class ProfilePageSmartComponent implements OnInit {

  user$: Observable<IUser> = this.store.pipe(select(getUserSelector));
  actionState$: Observable<ActionState> = this.store.pipe(select(getUsersActionStateSelector));

  private userId: number;

  constructor(private store: Store<State>,
              private userActions: UsersActions) {
  }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user')).id;
    this.store.dispatch(this.userActions.loadUser(this.userId));
  }

  updateUser(user: IUser): void {
    this.store.dispatch(this.userActions.updateUser(user));
  }

  updateUserPassword(updateUserPasswordView: IUpdateUserPasswordView): void {
    this.store.dispatch(this.userActions.updateUserPassword(this.userId, updateUserPasswordView));
  }
}
