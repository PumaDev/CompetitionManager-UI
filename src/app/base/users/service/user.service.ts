import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActiveStatus, IUpdateUserPasswordView, IUser } from '../models/users.model';
import { usersConfig } from './users.config';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(usersConfig.endpoints.getUsersEndpoint);
  }

  updateActiveStatus(activeStatus: ActiveStatus, userId: number): Observable<IUser> {
    const endpoint = usersConfig.endpoints.updateActiveStatusEndpoint
      .replace('{userId}', userId.toString())
      .replace('{activateStatus}', activeStatus.toString());

    return this.http.put<IUser>(endpoint, {});
  }

  getUser(userId: number): Observable<IUser> {
    const getUserEndpoint: string = usersConfig.endpoints.getUserEndpoint.replace('{userId}', userId.toString());

    return this.http.get<IUser>(getUserEndpoint);
  }

  updateUser(user: IUser): Observable<IUser> {
    const updateUserEndpoint: string = usersConfig.endpoints.updateUserEndpoint.replace('{userId}', user.id.toString());

    return this.http.put<IUser>(updateUserEndpoint, user);
  }

  updateUserPassword(userId: number, updateUserPasswordView: IUpdateUserPasswordView): Observable<string> {
    const updateUserEndpoint: string = usersConfig.endpoints.updateUserPasswordEndpoint.replace('{userId}', userId.toString());

    return this.http.put<string>(updateUserEndpoint, updateUserPasswordView);
  }
}
