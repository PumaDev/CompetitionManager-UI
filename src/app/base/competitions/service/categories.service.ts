import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICompetitionCategory } from '../models/category.model';
import { competitionsConfig } from './competitions.config';

@Injectable()
export class CompetitionCategoriesService {

  constructor(private http: HttpClient) {
  }

  getAllCompetitionCategories(): Observable<ICompetitionCategory[]> {
    return this.http.get<ICompetitionCategory[]>(competitionsConfig.categoriesEndpoint);
  }
}
