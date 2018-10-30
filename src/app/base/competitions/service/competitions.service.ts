import { Injectable } from '@angular/core';
import { ICompetition } from '../models/competitions.models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { competitionsConfig } from './competitions.config';
import { Observable } from 'rxjs';
import { PageRequest } from '../../../shared/general/general.models';

@Injectable()
export class CompetitionsService {

  constructor(private http: HttpClient) {
  }

  getFutureCompetitions(pageRequest: PageRequest): Observable<ICompetition[]> {
    const params = pageRequest.buildToHttpParams();

    return this.http.get<ICompetition[]>(competitionsConfig.futureCompetitionsEndpoint, { params: params });
  }

  getLastCompetitions(pageRequest: PageRequest): Observable<ICompetition[]> {
    const params = pageRequest.buildToHttpParams();

    return this.http.get<ICompetition[]>(competitionsConfig.lastCompetitionsEndpoint, { params: params });
  }
}
