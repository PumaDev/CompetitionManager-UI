import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActiveStatus, IUser } from '../models/users.model';
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
}
