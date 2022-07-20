import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppActions } from '../../core/store/app.actions';
import { AppState } from '../../core/store/app.state';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  templateUrl: 'crud.component.html',
  styleUrls: ['crud.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrudComponent implements OnInit, OnDestroy {
  constructor(
    public dialog: MatDialog,
    private router: Router,
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
    this.router.navigate(['form', 'new']);
  }

  update(uuid: string) {
    this.router.navigate(['form', uuid]);
  }

  deleteItem(uuid: string) {
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
