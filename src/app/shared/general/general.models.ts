import { HttpParams } from '@angular/common/http';

export enum ActionState {
  INITIAL = 'INITIAL',
  IN_PROGRESS = 'IN_PROGRESS',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED'
}

export interface IPageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
}

export class PageResponse<T> implements IPageResponse<T> {

  constructor(content: T[], totalPages: number, totalElements: number) {
    this.content = content;
    this.totalPages = totalPages;
    this.totalElements = totalElements;
  }

  content: T[];
  totalPages: number;
  totalElements: number;
}

// TODO: take out
export function createEmptyPageResponse<T>(): IPageResponse<T> {
  return <IPageResponse<T>> {
    content: [],
    totalPages: 0,
    totalElements: 0
  };
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
