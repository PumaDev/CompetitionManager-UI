import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthActions } from '../../../actions/auth.actions';
import { State } from '../../../../app.reducers';
import { select, Store } from '@ngrx/store';
import { accessTokenWithUserSelector, getLoginErrorCodeSelector } from '../../../actions/auth.selectors';
import { AccessTokenWithUser } from '../../../access-token.model';
import { ActivateStatus, IAccessToken } from '../../../../shared/permissions/models/permission.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-desctop',
  templateUrl: './login.desctop.component.html',
  styleUrls: ['./login.desctop.component.css']
})
export class LoginDesctopComponent implements OnInit {
// TODO: Create Smart Component
  loginForm: FormGroup;
  message: string;

  errorCode: number = 0;

  constructor(private store: Store<State>,
              private authActions: AuthActions,
              private router: Router) {
    // TODO: For refactoing. Take out to effects
    this.store.pipe(select(accessTokenWithUserSelector)).subscribe((accessTokenWithUser: AccessTokenWithUser) => {
      if (!accessTokenWithUser) {
        return;
      }
      if (accessTokenWithUser.user.activateStatus === ActivateStatus.WAITING_APPROVE) {
        this.message = 'Администротор ещё не рассмотрел вашу заявку';
      } else if (accessTokenWithUser.user.activateStatus === ActivateStatus.BANNED) {
        this.message = 'Извините, вы попали в бан-лист';
      } else if (accessTokenWithUser.user.activateStatus === ActivateStatus.BLOCKED) {
        this.message = 'Администротор отклонил вашу заявку на регистрацию';
      }
    });

    this.store.pipe(select(getLoginErrorCodeSelector))
      .subscribe( (errorCode: number) => this.errorCode = errorCode);
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  login() {
    const login: string = this.loginForm.value.login;
    const password: string = this.loginForm.value.password;

    this.store.dispatch(this.authActions.login(login, password));
  }
}
