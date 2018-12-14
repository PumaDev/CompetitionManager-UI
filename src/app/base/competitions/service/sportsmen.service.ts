import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISportsman } from '../models/sportmen.models';
import { competitionsConfig } from './competitions.config';
import { Observable } from 'rxjs';

@Injectable()
export class SportsmenService {

  constructor(private http: HttpClient) {
  }

  getSportsmenByCompetitionId(competitionId: number): Observable<ISportsman[]> {
    const endpoint = competitionsConfig.sportsmenByCompetition.replace('{competitionId}', competitionId.toString());

    return this.http.get<ISportsman[]>(endpoint);
  }

  addSportsmanToCompetition(competitionId: number, sportsman: ISportsman): Observable<ISportsman> {
    const endpoint = competitionsConfig.addSportsmanEndpoint.replace('{competitionId}', competitionId.toString());

    return this.http.post<ISportsman>(endpoint, sportsman);
  }

  deleteSportsman(sportsmanId: number): Observable<any> {
    const endpoint = competitionsConfig.deleteSportsman.replace('{sportsmanId}', sportsmanId.toString());

    return this.http.delete(endpoint);
  }
}
