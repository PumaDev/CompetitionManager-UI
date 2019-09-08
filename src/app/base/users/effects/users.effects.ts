import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ActionWithPayload, EMPTY_ACTION} from '../../../shared/utils/redux.utils';
import {Store} from '@ngrx/store';
import {State} from '../../../app.reducers';
import {catchError, map, switchMap} from 'rxjs/operators';
import {IUsersPayload, UsersActions} from '../actions/users.actions';
import {UserService} from '../service';
import {ActiveStatus, IUpdateUserPasswordView, IUser} from '../models/users.model';
import {HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class UsersEffects {

  @Effect() loadUsers$;
  @Effect() updateActiveStatus$;

  @Effect() loadUser$;

  @Effect() updateUser$;
  @Effect() updateUserSuccess$;
  @Effect() updateUserFailure$;

  @Effect() updateUserPassword$;
  @Effect() updateUserPasswordSuccess$;
  @Effect() updateUserPasswordFailure$;

  constructor(private actions$: Actions<ActionWithPayload<IUsersPayload>>,
              private store: Store<State>,
              private usersService: UserService,
              private usersActions: UsersActions,
              private _snackBar: MatSnackBar) {

    /*****************************************************************************
     * Load Users
     *****************************************************************************/
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
     *****************************************************************************/
    this.updateActiveStatus$ = this.actions$.pipe(
      ofType(UsersActions.UPDATE_ACTIVE_STATUS),
      map((action: ActionWithPayload<IUsersPayload>) => ({...action.payload})),
      switchMap(({userId, activeStatus}: { userId: number, activeStatus: ActiveStatus }) =>
        this.usersService.updateActiveStatus(activeStatus, userId)
          .pipe(
            map((user: IUser) => this.usersActions.updateActiveStatusSuccess(user)),
            catchError((errorResponse: HttpErrorResponse) =>
              of(this.usersActions.updateActiveStatusFailure(errorResponse.error.errorCode))
            )
          )
      )
    );

    /*****************************************************************************
     * Load User
     *****************************************************************************/
    this.loadUser$ = this.actions$.pipe(
      ofType(UsersActions.LOAD_USER),
      map((action: ActionWithPayload<IUsersPayload>) => ({...action.payload})),
      switchMap(({userId}: { userId: number }) =>
        this.usersService.getUser(userId)
          .pipe(
            map((user: IUser) => this.usersActions.loadUserSuccess(user)),
            catchError((errorResponse: HttpErrorResponse) =>
              of(this.usersActions.loadUserFailure(errorResponse.error.errorCode))
            )
          )
      )
    );

    /*****************************************************************************
     * Update User
     *****************************************************************************/
    this.updateUser$ = this.actions$.pipe(
      ofType(UsersActions.UPDATE_USER),
      map((action: ActionWithPayload<IUsersPayload>) => ({...action.payload})),
      switchMap(({user}: { user: IUser }) =>
        this.usersService.updateUser(user)
          .pipe(
            map((updatesUser: IUser) => this.usersActions.updateUserSuccess(updatesUser)),
            catchError((errorResponse: HttpErrorResponse) =>
              of(this.usersActions.updateUserFailure(errorResponse.error.errorCode))
            )
          )
      )
    );

    /*****************************************************************************
     * Update User Success
     *****************************************************************************/
    this.updateUserSuccess$ = this.actions$.pipe(
      ofType(UsersActions.UPDATE_USER_SUCCESS),
      map((action: ActionWithPayload<IUsersPayload>) => ({...action.payload})),
      switchMap(() => {
        this._snackBar.open('Изменения сохранены', 'OK', {
          duration: 5 * 1000
        });
        return of(EMPTY_ACTION);
      })
    );

    /*****************************************************************************
     * Update User Failure
     *****************************************************************************/
    this.updateUserFailure$ = this.actions$.pipe(
      ofType(UsersActions.UPDATE_USER_FAILURE),
      map((action: ActionWithPayload<IUsersPayload>) => ({...action.payload})),
      switchMap(({errorCode}: { errorCode: number }) => {
        // TODO: Create global getErrorMessage(errorCode: number) function
        var errorMessage: string = null;
        switch (errorCode) {
          case 1: errorMessage = 'Логин уже занят'; break;
          case 2: errorMessage = 'Клуб уже занят'; break;
          default:
            errorMessage = 'Неизвестаня ошибка';
        }
        this._snackBar.open('Ошибка при сохранении: ' + errorMessage, 'OK', {
          duration: 5 * 1000
        });
        return of(EMPTY_ACTION);
      })
    );

    /*****************************************************************************
     * Update User Password
     *****************************************************************************/
    this.updateUserPassword$ = this.actions$.pipe(
      ofType(UsersActions.UPDATE_USER_PASSWORD),
      map((action: ActionWithPayload<IUsersPayload>) => ({...action.payload})),
      switchMap(({ userId, updateUserPasswordView }: { userId: number, updateUserPasswordView: IUpdateUserPasswordView }) =>
        this.usersService.updateUserPassword(userId, updateUserPasswordView)
          .pipe(
            map(() => this.usersActions.updateUserPasswordSuccess()),
            catchError((errorResponse: HttpErrorResponse) =>
              of(this.usersActions.updateUserPasswordFailure(errorResponse.error.errorCode))
            )
          )
      )
    );

    /*****************************************************************************
     * Update User Password Success
     *****************************************************************************/
    this.updateUserPasswordSuccess$ = this.actions$.pipe(
      ofType(UsersActions.UPDATE_USER_PASSWORD_SUCCESS),
      map((action: ActionWithPayload<IUsersPayload>) => ({...action.payload})),
      switchMap(() => {
        this._snackBar.open('Пароль изменён', 'OK', {
          duration: 5 * 1000
        });
        return of(EMPTY_ACTION);
      })
    );

    /*****************************************************************************
     * Update User Password Failure
     *****************************************************************************/
    this.updateUserPasswordFailure$ = this.actions$.pipe(
      ofType(UsersActions.UPDATE_USER_PASSWORD_FAILURE),
      map((action: ActionWithPayload<IUsersPayload>) => ({...action.payload})),
      switchMap(({errorCode}: { errorCode: number }) => {
        const errorMessage: string = errorCode === 31 ? 'Старый пароль введён не правильно' : 'Неизвестная ошибка';
        this._snackBar.open('Ошибка при сохранении: ' + errorMessage, 'OK', {
          duration: 5 * 1000
        });
        return of(EMPTY_ACTION);
      })
    );
  }
}
