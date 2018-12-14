import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ActionWithPayload } from '../../../shared/utils/redux.utils';
import { Store } from '@ngrx/store';
import { State } from '../../../app.reducers';
import { ISportsmenPayload, SportsmenActions } from '../actions/sportsmen.actions';
import { SportsmenService } from '../service/sportsmen.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ISportsman } from '../models/sportmen.models';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable()
export class SportsmenEffects {
  @Effect() loadSportsmenByCompetition$;
  @Effect() addSportsmanToCompetition$;
  @Effect() deleteSportsmanFromCompetition$;

  constructor(private actions$: Actions<ActionWithPayload<ISportsmenPayload>>,
              private store: Store<State>,
              private sportsmenService: SportsmenService,
              private sportsmenActions: SportsmenActions) {
    /*****************************************************************************
     * Load Sportsmen By Competition
     */
    this.loadSportsmenByCompetition$ = this.actions$.pipe(
      ofType(SportsmenActions.LOAD_SPORTSMEN_BY_COMPETITION),
      map((action: ActionWithPayload<ISportsmenPayload>) => ({...action.payload})),
      switchMap(({competitionId}: { competitionId: number }) =>
        this.sportsmenService.getSportsmenByCompetitionId(competitionId)
          .pipe(
            map((sportsmen: ISportsman[]) => this.sportsmenActions.loadSportsmenByCompetitionSuccess(sportsmen))
          )
      )
    );

    /*****************************************************************************
     * Add Sportsman To Competition
     */
    this.addSportsmanToCompetition$ = this.actions$.pipe(
      ofType(SportsmenActions.ADD_SPORTSMAN_TO_COMPETITION),
      map((action: ActionWithPayload<ISportsmenPayload>) => ({...action.payload})),
      switchMap(({competitionId, sportsman}: { competitionId: number, sportsman: ISportsman }) =>
        this.sportsmenService.addSportsmanToCompetition(competitionId, sportsman)
          .pipe(
            map((createdSportsman: ISportsman) => this.sportsmenActions.addSportsmanToCompetitionSuccess(createdSportsman)),
            catchError((httpError: HttpErrorResponse) => of(this.sportsmenActions.addSportsmanToCompetitionFailure(httpError.error.errorCode)))
          )
      )
    );

    /*****************************************************************************
     * Delete Sportsman From Competition
     */
    this.deleteSportsmanFromCompetition$ = this.actions$.pipe(
      ofType(SportsmenActions.DELETE_SPORTSMAN),
      map((action: ActionWithPayload<ISportsmenPayload>) => ({...action.payload})),
      switchMap(({ sportsmanId }: { sportsmanId: number }) =>
        this.sportsmenService.deleteSportsman(sportsmanId)
          .pipe(
            map(() => this.sportsmenActions.deleteSportsmanSuccess(sportsmanId))
          )
      )
    );
  }
}
