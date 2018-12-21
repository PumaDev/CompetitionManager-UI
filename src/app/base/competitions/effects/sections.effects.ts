import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ISectionPayload, SectionActions } from '../actions/section.actions';
import { SectionsService } from '../service';
import { ActionWithPayload } from '../../../shared/utils/redux.utils';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable()
export class SectionsEffects {

  @Effect() loadSections$;

  constructor(private actions$: Actions<ISectionPayload>,
              private sectionsService: SectionsService,
              private sectionActions: SectionActions) {
    /*********************************************************************
     * Load Sections
     */
    this.loadSections$ = this.actions$.pipe(
      ofType(SectionActions.LOAD_SECTIONS),
      map((action: ActionWithPayload<ISectionPayload>) => ({...action.payload})),
      switchMap(({}: {}) =>
        this.sectionsService.getSections().pipe(
          map((sections: string[]) => this.sectionActions.loadSectionsSuccess(sections)),
          catchError((errorResponse: HttpErrorResponse) =>
            of(this.sectionActions.loadSectionsFailure(errorResponse.error.errorCode))
          )
        )
      )
    );
  }
}
