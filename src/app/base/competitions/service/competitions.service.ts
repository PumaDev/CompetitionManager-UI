import {Injectable} from '@angular/core';
import {GeneratedCompetitionGrid, ICompetition, RegistrationStatus} from '../models/competitions.models';
import {HttpClient} from '@angular/common/http';
import {competitionsConfig} from './competitions.config';
import {Observable} from 'rxjs';
import {IPageResponse, PageRequest} from '../../../shared/general/general.models';

@Injectable()
export class CompetitionsService {

  constructor(private http: HttpClient) {
  }

  getFutureCompetitions(pageRequest: PageRequest): Observable<IPageResponse<ICompetition>> {
    const params = pageRequest.buildToHttpParams();

    return this.http.get<IPageResponse<ICompetition>>(competitionsConfig.futureCompetitionsEndpoint, {params: params});
  }

  getLastCompetitions(pageRequest: PageRequest): Observable<IPageResponse<ICompetition>> {
    const params = pageRequest.buildToHttpParams();

    return this.http.get<IPageResponse<ICompetition>>(competitionsConfig.lastCompetitionsEndpoint, {params: params});
  }

  createCompetition(competition: ICompetition): Observable<ICompetition> {
    return this.http.post<ICompetition>(competitionsConfig.createCompetitionEndpoint, competition);
  }

  getCompetition(competitionId: number): Observable<ICompetition> {
    const endpoint = competitionsConfig.competitionByIdEndpoint.replace('{id}', competitionId.toString());

    return this.http.get<ICompetition>(endpoint);
  }

  updateRegistrationStatus(competitionId: number, registrationStatus: RegistrationStatus): Observable<ICompetition> {
    const endpoint = competitionsConfig.updateRegistrationStatusInCompetition
      .replace('{competitionId}', competitionId.toString())
      .replace('{registrationStatus}', registrationStatus.toString());

    return this.http.put<ICompetition>(endpoint, {});
  }

  generateGrid(competitionId: number): Observable<GeneratedCompetitionGrid> {
    const endpoint: string = competitionsConfig.generateGrid.replace('{competitionId}', competitionId.toString());

    return this.http.post<GeneratedCompetitionGrid>(endpoint, {});
  }

  deleteCompetition(competitionId: number): Observable<boolean> {
    const endpoint: string = competitionsConfig.deleteCompetition.replace('{competitionId}', competitionId.toString());

    return this.http.delete<boolean>(endpoint);
  }

  updateCompetition(competition: ICompetition): Observable<ICompetition> {
    const endpoint: string = competitionsConfig.updateCompetition.replace('{competitionId}', competition.id.toString());

    return this.http.put<ICompetition>(endpoint, competition);
  }
}
