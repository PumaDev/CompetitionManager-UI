import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccessTokenWithUser } from '../access-token.model';
import { authConfig } from './auth.config';
import { ICreateUserView, RegistrationResponse } from '../model/registration.models';
import { IUser } from '../../shared/permissions/models/permission.models';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) {
  }

  login(login: string, password: string): Observable<AccessTokenWithUser> {
    return this.http.post<AccessTokenWithUser>(authConfig.loginEndpoint, {login: login, password: password});
  }

  createUser(newUser: ICreateUserView): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(authConfig.createUserEndpoint, newUser);
  }

  refreshToken(): Observable<AccessTokenWithUser> {
    return this.http.post<AccessTokenWithUser>(authConfig.refreshTokenEndpoint, {});
  }
}
