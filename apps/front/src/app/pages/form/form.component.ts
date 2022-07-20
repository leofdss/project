import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Item } from '@project/api-interfaces';

import { AppActions } from '../../core/store/app.actions';
import { AppState } from '../../core/store/app.state';

@Component({
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  constructor(
    private router: Router,
    private store: Store<{ appState: AppState }>
  ) {}

  saved = false;
  form = new FormGroup({
    uuid: new FormControl<string | undefined>(undefined),
    name: new FormControl<string | undefined>(undefined, [Validators.required]),
    age: new FormControl<number | undefined>(undefined, [Validators.required]),
  });

  save(): void {
    if (this.form.valid) {
      this.store.dispatch(AppActions.save({ item: this.form.value as Item }));
    }
  }

  cancel(): void {
    this.router.navigate(['crud']);
  }
}
