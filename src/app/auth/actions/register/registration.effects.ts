import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../app.reducers';
import { ActionWithPayload } from '../../../shared/utils/redux.utils';
import { LoginService } from '../../services/login.service';
import { RegistrationActions, RegistrationPayload } from './registration.actions';
import { map, switchMap } from 'rxjs/operators';
import { ICreateUserView, RegistrationResponse } from '../../model/registration.models';
import { IUser } from '../../../shared/permissions/models/permission.models';

@Injectable()
export class RegistrationEffects {

  @Effect() registrationEffect$;

  constructor(private store: Store<State>,
              private actions$: Actions<ActionWithPayload<RegistrationPayload>>,
              private registrationActions: RegistrationActions,
              private loginService: LoginService) {
    /*************************************************************
     * Create User
     ************************************************************/
    this.registrationEffect$ = this.actions$.pipe(
      ofType(RegistrationActions.REGISTRATION),
      map((action: ActionWithPayload<RegistrationPayload>) => ({...action.payload})),
      switchMap(({newUser}: { newUser: ICreateUserView }) =>
        this.loginService.createUser(newUser)
          .pipe(
            map((registrationResponse: RegistrationResponse) => {
              return registrationResponse.success ?
                this.registrationActions.createUserSuccess(registrationResponse.createdUser) :
                this.registrationActions.createUserFailed(registrationResponse.errorCode);
            })
          )
      )
    );
  }
}
