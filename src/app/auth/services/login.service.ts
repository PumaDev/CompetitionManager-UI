import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccessTokenWithUser } from '../access-token.model';
import { authConfig } from './auth.config';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) {
  }

  login(login: string, password: string): Observable<AccessTokenWithUser> {
    return this.http.post<AccessTokenWithUser>(authConfig.loginEndpoint, {login: login, password: password});
  }
}
