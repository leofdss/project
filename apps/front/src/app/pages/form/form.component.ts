import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Item } from '@project/api-interfaces';
import { Subscription } from 'rxjs';

import { AppActions } from '../../core/store/app.actions';
import { AppState } from '../../core/store/app.state';

@Component({
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private store: Store<{ appState: AppState }>,
    private route: ActivatedRoute,
    private actions$: Actions
  ) {}

  subs: Subscription[] = [];
  saved = false;
  form = new FormGroup({
    uuid: new FormControl<string | undefined>(undefined),
    name: new FormControl<string | undefined>(undefined, [Validators.required]),
    age: new FormControl<number | undefined>(undefined, [Validators.required]),
  });

  ngOnInit() {
    const value = this.route.snapshot.data[0] as Item | null;
    if (value) {
      this.form.patchValue(value);
    }
    this.subs.push(
      this.actions$.pipe(ofType(AppActions.saveSuccess)).subscribe(() => {
        this.saved = true;
        this.router.navigate(['crud']);
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((e) => e.unsubscribe());
  }

  save(): void {
    if (this.form.valid) {
      const value = this.form.value as Item;
      this.store.dispatch(AppActions.save({ item: value }));
    }
  }

  cancel(): void {
    this.router.navigate(['crud']);
  }
}
