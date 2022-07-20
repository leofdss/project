import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/store/app.state';

@Component({
  templateUrl: 'crud.component.html',
  styleUrls: ['crud.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrudComponent {
  constructor(private store: Store<{ appState: AppState }>) {}

  appState$ = this.store.select('appState');
}
