import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {ActionWithPayload, createTypedAction, EMPTY_ACTION} from '../../../shared/utils/redux.utils';
import {CompetitionsActions, ICompetitionPayload} from '../actions/competitions.actions';
import {Store} from '@ngrx/store';
import {State} from '../../../app.reducers';
import {catchError, map, switchMap} from 'rxjs/operators';
import {GeneratedCompetitionGrid, ICompetition, RegistrationStatus} from '../models/competitions.models';
import {CompetitionsService} from '../service';
import {IPageResponse, PageRequest} from '../../../shared/general/general.models';
import {HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {ICompetitionCategory} from '../models/category.model';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class CompetitionsEffects {

  @Effect() loadFutureCompetitions$;
  @Effect() loadLastCompetitions$;
  @Effect() createCompetition$;
  @Effect() loadCompetitionById$;
  @Effect() setRegistrationStatus$;
  @Effect() generateGrid$;
  @Effect() deleteCompetition$;
  @Effect() deleteCompetitionSuccess$;
  @Effect() updateCompetition$;

  @Effect() addCategoriesToCompetition$;
  @Effect() addCategoriesToCompetitionSuccess$;
  @Effect() addCategoriesToCompetitionFailure$;

  constructor(private actions$: Actions<ActionWithPayload<ICompetitionPayload>>,
              private store: Store<State>,
              private router: Router,
              private competitionsService: CompetitionsService,
              private competitionsActions: CompetitionsActions,
              private _snackBar: MatSnackBar) {

    /*****************************************************************************
     * Load Future Competitions
     */
    this.loadFutureCompetitions$ = this.actions$.pipe(
      ofType(CompetitionsActions.LOAD_COMPETITIONS),
      map((action: ActionWithPayload<ICompetitionPayload>) => ({...action.payload})),
      switchMap(({futureCompetitionsPage}: { futureCompetitionsPage: number }) =>
        this.competitionsService.getFutureCompetitions(new PageRequest(futureCompetitionsPage))
          .pipe(
            map((futureCompetitionsPage: IPageResponse<ICompetition>) => this.competitionsActions.loadFutureCompetitionsSuccess(futureCompetitionsPage))
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
            map((lastCompetitionsPage: IPageResponse<ICompetition>) => this.competitionsActions.loadLastCompetitionsSuccess(lastCompetitionsPage))
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
              map(() => this.competitionsActions.createCompetitionSuccess()),
              catchError(() => of(this.competitionsActions.createCompetitionFailure()))
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

    /************************************************************************************
     * Set Registration Status
     */
    this.setRegistrationStatus$ = this.actions$.pipe(
      ofType(CompetitionsActions.SET_REGISTRATION_STATUS),
      map((action: ActionWithPayload<ICompetitionPayload>) => ({...action.payload})),
      switchMap(({competitionId, registrationStatus}: { competitionId: number, registrationStatus: RegistrationStatus }) =>
        this.competitionsService.updateRegistrationStatus(competitionId, registrationStatus)
          .pipe(
            map((competition: ICompetition) =>
              this.competitionsActions.setRegistrationStatusSuccess(competition)
            ),
            catchError((errorResponse: HttpErrorResponse) =>
              of(this.competitionsActions.setRegistrationStatusFailed(errorResponse.error.errorCode))
            )
          )
      )
    );

    /************************************************************************************
     * Generate Grid
     ************************************************************************************/
    this.generateGrid$ = this.actions$.pipe(
      ofType(CompetitionsActions.GENERATE_GRID),
      map((action: ActionWithPayload<ICompetitionPayload>) => ({...action.payload})),
      switchMap(({competitionId}: { competitionId: number }) =>
        this.competitionsService.generateGrid(competitionId)
          .pipe(
            map((generatedCompetitionGrid: GeneratedCompetitionGrid) =>
              this.competitionsActions.generateGridSuccess(generatedCompetitionGrid)
            ),
            catchError((errorResponse: HttpErrorResponse) =>
              of(this.competitionsActions.generateGridFaulure(errorResponse.error.errorCode))
            )
          )
      )
    );

    /************************************************************************************
     * Delete Competition
     ************************************************************************************/
    this.deleteCompetition$ = this.actions$.pipe(
      ofType(CompetitionsActions.DELETE_COMPETITION),
      map((action: ActionWithPayload<ICompetitionPayload>) => ({...action.payload})),
      switchMap(({competitionId}: { competitionId: number }) =>
        this.competitionsService.deleteCompetition(competitionId)
          .pipe(
            map(() =>
              this.competitionsActions.deleteCompetitionSuccess()
            ),
            catchError((errorResponse: HttpErrorResponse) =>
              of(this.competitionsActions.deleteCompetitionFaulure(errorResponse.error.errorCode))
            )
          )
      )
    );

    /************************************************************************************
     * Delete Competition Success
     ************************************************************************************/
    this.deleteCompetitionSuccess$ = this.actions$.pipe(
      ofType(CompetitionsActions.DELETE_COMPETITION_SUCCESS),
      map((action: ActionWithPayload<ICompetitionPayload>) => ({...action.payload})),
      switchMap(() => {
          this.router.navigateByUrl('/competitions');
          return of(EMPTY_ACTION);
        }
      )
    );

    /************************************************************************************
     * Update Competition
     ************************************************************************************/
    this.updateCompetition$ = this.actions$.pipe(
      ofType(CompetitionsActions.UPDATE_COMPETITION),
      map((action: ActionWithPayload<ICompetitionPayload>) => ({...action.payload})),
      switchMap(({competition}: { competition: ICompetition }) => {
        competition.startDate = (competition.startDate as Date).toLocaleDateString();
        competition.endDate = (competition.endDate as Date).toLocaleDateString();
        return this.competitionsService.updateCompetition(competition)
          .pipe(
            map((updatedCompetition: ICompetition) => this.competitionsActions.updateCompetitionSuccess(updatedCompetition)),
            catchError((errorResponse: HttpErrorResponse) =>
              of(this.competitionsActions.updateCompetitionFailure(errorResponse.error.errorCode))
            )
          );
      })
    );

    /************************************************************************************
     * Add Categories To Competition
     ************************************************************************************/
    this.addCategoriesToCompetition$ = this.actions$.pipe(
      ofType(CompetitionsActions.ADD_CATEGORIES),
      map((action: ActionWithPayload<ICompetitionPayload>) => ({...action.payload})),
      switchMap(({competitionId, competitionCategories}: { competitionId: number, competitionCategories: ICompetitionCategory[] }) =>
        this.competitionsService.addCategoriesToCompetition(competitionId, competitionCategories.map(category => category.id))
          .pipe(
            map((updatedCompetition: ICompetition) => this.competitionsActions.addCompetitionCategoriesSuccess(updatedCompetition)),
            catchError((errorResponse: HttpErrorResponse) =>
              of(this.competitionsActions.addCompetitionCategoriesFailure(errorResponse.error.errorCode))
            )
          )
      )
    );

    /************************************************************************************
     * Add Categories To Competition Success
     ************************************************************************************/
    this.addCategoriesToCompetitionSuccess$ = this.actions$.pipe(
      ofType(CompetitionsActions.ADD_CATEGORIES_SUCCESS),
      switchMap(() => {
        this._snackBar.open('Категории добавлены', 'OK', {
          duration: 5 * 1000
        });
        return of(EMPTY_ACTION);
      })
    );

    /************************************************************************************
     * Add Categories To Competition Failure
     ************************************************************************************/
    this.addCategoriesToCompetitionFailure$ = this.actions$.pipe(
      ofType(CompetitionsActions.ADD_CATEGORIES_FAILURE),
      switchMap(() => {
        this._snackBar.open('При добавлении произошла ошибка', 'OK', {
          duration: 5 * 1000
        });
        return of(EMPTY_ACTION);
      })
    );
  }
}
