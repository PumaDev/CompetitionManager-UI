import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICompetitionCategory } from '../models/category.model';
import { competitionsConfig } from './competitions.config';

@Injectable()
export class CompetitionCategoriesService {

  constructor(private http: HttpClient) {
  }

  getAllCompetitionCategories(): Observable<ICompetitionCategory[]> {
    return this.http.get<ICompetitionCategory[]>(competitionsConfig.categoriesEndpoint);
  }

  getCategoriesByCompetition(competitionId: number): Observable<ICompetitionCategory[]> {
    const endpoint = competitionsConfig.getCategoriesByCompetitionEndpoint
      .replace('{competitionId}', competitionId.toString());

    return this.http.get<ICompetitionCategory[]>(endpoint);
  }

  createCompetitionCategory(category: ICompetitionCategory): Observable<ICompetitionCategory> {
    return this.http.post<ICompetitionCategory>(competitionsConfig.categoriesEndpoint, category);
  };
}
