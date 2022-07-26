import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  debounceTime,
  distinctUntilKeyChanged,
  map,
  mergeMap,
  of,
  tap,
} from 'rxjs';

import { AppService } from '../services/app.service';
import { AppActions } from './app.actions';
import { AppState } from './app.state';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private store: Store<{ appState: AppState }>,
    private appService: AppService,
    private snackBar: MatSnackBar
  ) {}

  error$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          AppActions.deleteFailed,
          AppActions.listFailed,
          AppActions.saveFailed
        ),
        tap((action) => {
          this.snackBar.open(action.error, '❌');
        })
      ),
    { dispatch: false }
  );

  save$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.save),
      mergeMap((action) =>
        this.appService.save(action.item).pipe(
          map((result) => AppActions.saveSuccess({ item: result })),
          catchError((error: HttpErrorResponse) =>
            of(AppActions.saveFailed({ error: error.statusText }))
          )
        )
      )
    )
  );

  saveSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.saveSuccess),
      map(() => AppActions.list())
    )
  );

  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.search),
      debounceTime(500),
      distinctUntilKeyChanged('search'),
      map(() => AppActions.list())
    )
  );

  list$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.list),
      concatLatestFrom(() => this.store.select('appState')),
      mergeMap(([, state]) =>
        this.appService.list(state.search).pipe(
          map((items) => AppActions.listSuccess({ items })),
          catchError((error: HttpErrorResponse) =>
            of(AppActions.listFailed({ error: error.statusText }))
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.delete),
      mergeMap((action) =>
        this.appService.delete(action.uuid).pipe(
          map(() => AppActions.deleteSuccess()),
          catchError((error: HttpErrorResponse) =>
            of(AppActions.deleteFailed({ error: error.statusText }))
          )
        )
      )
    )
  );

  deleteSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.deleteSuccess),
      map(() => AppActions.list())
    )
  );
}
