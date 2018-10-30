import { HttpParams } from '@angular/common/http';

export enum ActionState {
  INITIAL = 'INITIAL',
  IN_PROGRESS = 'IN_PROGRESS',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED'
}

export interface IPageRequest {
  pageNumber?: number;
  offset?: number;
  size: number;
}

export class PageRequest implements IPageRequest {
  pageNumber: number;
  size: number;

  constructor(pageNumber: number, size: number = 10) {
    this.pageNumber = pageNumber;
    this.size = size;
  }

  buildToHttpParams(): HttpParams {
    return new HttpParams()
      .set('page', this.pageNumber.toString())
      .set('size', this.size.toString());
  }
}
