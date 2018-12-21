import { Injectable } from '@angular/core';
import { ActionWithPayload, createTypedAction } from '../../../shared/utils/redux.utils';

@Injectable()
export class SectionActions {
  static readonly LOAD_SECTIONS = '[Sections] Load Section';
  static readonly LOAD_SECTIONS_SUCCESS = '[Sections] Load Section Success';
  static readonly LOAD_SECTIONS_FAILURE = '[Sections] Load Section Failure';

  loadSections(): ActionWithPayload<ISectionPayload> {
    return createTypedAction<ISectionPayload>(SectionActions.LOAD_SECTIONS, {});
  }

  loadSectionsSuccess(sections: string[]): ActionWithPayload<ISectionPayload> {
    return createTypedAction<ISectionPayload>(SectionActions.LOAD_SECTIONS_SUCCESS, {
      sections: sections
    });
  }

  loadSectionsFailure(errorCode: number): ActionWithPayload<ISectionPayload> {
    return createTypedAction<ISectionPayload>(SectionActions.LOAD_SECTIONS_FAILURE, {
      errorCode: errorCode
    });
  }
}

export interface ISectionPayload {
  sections?: string[];
  errorCode?: number;
}
