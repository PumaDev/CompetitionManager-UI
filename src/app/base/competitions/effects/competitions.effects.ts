import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ActionWithPayload } from '../../../shared/utils/redux.utils';
import { CompetitionsActions, ICompetitionPayload } from '../actions/competitions.actions';
import { Store } from '@ngrx/store';
import { State } from '../../../app.reducers';
import { map, switchMap } from 'rxjs/operators';
import { ICompetition } from '../models/competitions.models';
import { CompetitionsService } from '../service/competitions.service';
import { PageRequest } from '../../../shared/general/general.models';

@Injectable()
export class CompetitionsEffects {

  @Effect() loadFutureCompetitions$;
  @Effect() loadLastCompetitions$;
  @Effect() createCompetition$;
  @Effect() loadCompetitionById$;

  constructor(private actions$: Actions<ActionWithPayload<ICompetitionPayload>>,
              private store: Store<State>,
              private competitionsService: CompetitionsService,
              private competitionsActions: CompetitionsActions) {

    /*****************************************************************************
     * Load Future Competitions
     */
    this.loadFutureCompetitions$ = this.actions$.pipe(
      ofType(CompetitionsActions.LOAD_COMPETITIONS),
      map((action: ActionWithPayload<ICompetitionPayload>) => ({...action.payload})),
      switchMap(({futureCompetitionsPage}: { futureCompetitionsPage: number }) =>
        this.competitionsService.getFutureCompetitions(new PageRequest(futureCompetitionsPage))
          .pipe(
            map((futureCompetitions: ICompetition[]) => this.competitionsActions.loadFutureCompetitionsSuccess(futureCompetitions))
          )
      )
    );

    /*****************************************************************************
     * Load Last Competitions
     */
    this.loadLastCompetitions$ = this.actions$.pipe(
      ofType(CompetitionsActions.LOAD_COMPETITIONS),
      map((action: ActionWithPayload<ICompetitionPayload>) => ({...action.payload})),
      switchMap(({lastCompetitionsPage}: { lastCompetitionsPage: number }) =>
        this.competitionsService.getLastCompetitions(new PageRequest(lastCompetitionsPage))
          .pipe(
            map((lastCompetitions: ICompetition[]) => this.competitionsActions.loadLastCompetitionsSuccess(lastCompetitions))
          )
      )
    );

    /************************************************************************************
     * Create Competition
     */
    this.createCompetition$ = this.actions$.pipe(
      ofType(CompetitionsActions.CREATE_COMPETITION),
      map((action: ActionWithPayload<ICompetitionPayload>) => ({...action.payload})),
      switchMap(({competition}: { competition: ICompetition }) => {
          competition.startDate = (competition.startDate as Date).toLocaleDateString();
          competition.endDate = (competition.endDate as Date).toLocaleDateString();
          return this.competitionsService.createCompetition(competition)
            .pipe(
              map((competition) => this.competitionsActions.createCompetitionSuccess())
            );
        }
      )
    );

    /************************************************************************************
     * Load Competition By Id
     */
    this.loadCompetitionById$ = this.actions$.pipe(
      ofType(CompetitionsActions.LOAD_COMPETITION),
      map((action: ActionWithPayload<ICompetitionPayload>) => ({...action.payload})),
      switchMap(({competitionId}: { competitionId: number }) =>
        this.competitionsService.getCompetition(competitionId)
          .pipe(
            map((competition: ICompetition) => this.competitionsActions.loadCompetitionSuccess(competition))
          )
      )
    );
  }
}
