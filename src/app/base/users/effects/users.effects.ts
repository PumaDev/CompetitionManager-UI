import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ActionWithPayload } from '../../../shared/utils/redux.utils';
import { Store } from '@ngrx/store';
import { State } from '../../../app.reducers';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IUsersPayload, UsersActions } from '../actions/users.actions';
import { UserService } from '../service';
import { ActiveStatus, IUser } from '../models/users.model';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable()
export class UsersEffects {

  @Effect() loadUsers$;
  @Effect() updateActiveStatus$;

  constructor(private actions$: Actions<ActionWithPayload<IUsersPayload>>,
              private store: Store<State>,
              private usersService: UserService,
              private usersActions: UsersActions) {

    /*****************************************************************************
     * Load Users
     */
    this.loadUsers$ = this.actions$.pipe(
      ofType(UsersActions.LOAD_USERS),
      map((action: ActionWithPayload<IUsersPayload>) => ({...action.payload})),
      switchMap(({}: {}) =>
        this.usersService.getUsers()
          .pipe(
            map((users: IUser[]) => this.usersActions.loadUsersSuccess(users)),
            catchError((errorResponse: HttpErrorResponse) =>
              of(this.usersActions.loadUsersFailure(errorResponse.error.errorCode))
            )
          )
      )
    );

    /*****************************************************************************
     * Update User Active Status
     */
    this.updateActiveStatus$ = this.actions$.pipe(
      ofType(UsersActions.UPDATE_ACTIVE_STATUS),
      map((action: ActionWithPayload<IUsersPayload>) => ({...action.payload})),
      switchMap(({ userId, activeStatus }: { userId: number, activeStatus: ActiveStatus }) =>
        this.usersService.updateActiveStatus(activeStatus, userId)
          .pipe(
            map((user: IUser) => this.usersActions.updateActiveStatusSuccess(user)),
            catchError((errorResponse: HttpErrorResponse) =>
              of(this.usersActions.updateActiveStatusFailure(errorResponse.error.errorCode))
            )
          )
      )
    );
  }
}
