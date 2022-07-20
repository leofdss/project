import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Item } from '@project/api-interfaces';
import { Subscription } from 'rxjs';
import { AppActions } from '../../core/store/app.actions';
import { AppState } from '../../core/store/app.state';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { FormDialogComponent } from './form-dialog/form-dialog.component';

@Component({
  templateUrl: 'crud.component.html',
  styleUrls: ['crud.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrudComponent implements OnInit, OnDestroy {
  constructor(
    public dialog: MatDialog,
    private store: Store<{ appState: AppState }>
  ) {}

  appState$ = this.store.select('appState');
  subs: Subscription[] = [];
  displayedColumns: string[] = ['name', 'age', 'buttons'];

  ngOnInit(): void {
    this.store.dispatch(AppActions.list());
  }

  ngOnDestroy(): void {
    this.subs.forEach((e) => e.unsubscribe());
  }

  add(): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '250px',
    });

    this.subs.push(
      dialogRef.afterClosed().subscribe((item: Item) => {
        if (item) {
          this.store.dispatch(AppActions.save({ item }));
        }
      })
    );
  }

  update(item: Item) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '250px',
      data: item,
    });

    this.subs.push(
      dialogRef.afterClosed().subscribe((item: Item) => {
        if (item) {
          this.store.dispatch(AppActions.save({ item }));
        }
      })
    );
  }

  delete(uuid: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
    });

    this.subs.push(
      dialogRef.afterClosed().subscribe((confirm: boolean) => {
        if (confirm) {
          this.store.dispatch(AppActions.delete({ uuid }));
        }
      })
    );
  }
}
