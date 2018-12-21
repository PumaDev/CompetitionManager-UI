import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { competitionsConfig } from './competitions.config';

@Injectable()
export class SectionsService {

  constructor(private http: HttpClient) {
  }

  getSections(): Observable<string[]> {
    return this.http.get<string[]>(competitionsConfig.sectionsEndpoint);
  }
}
