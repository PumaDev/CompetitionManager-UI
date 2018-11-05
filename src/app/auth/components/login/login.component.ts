import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthActions } from '../../actions/auth.actions';
import { State } from '../../../app.reducers';
import { select, Store } from '@ngrx/store';
import { accessTokenWithUserSelector } from '../../actions/auth.selectors';
import { AccessTokenWithUser } from '../../access-token.model';
import { IAccessToken } from '../../../shared/permissions/models/permission.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private store: Store<State>,
              private authActions: AuthActions,
              private router: Router) {
    this.store.pipe(select(accessTokenWithUserSelector)).subscribe((accessTokenWithUser: AccessTokenWithUser) => {
      if (accessTokenWithUser) {
        this.afterLogin(accessTokenWithUser);
      }
    });
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

  private afterLogin(accessTokenWithUser: AccessTokenWithUser) {
    const accessToken: IAccessToken = { token: accessTokenWithUser.token, expiresIn: new Date() };
    const user = accessTokenWithUser.user;
    sessionStorage.setItem('access-token', JSON.stringify(accessToken));
    sessionStorage.setItem('user', JSON.stringify(user));

    this.router.navigateByUrl('/welcome');
  }
}
