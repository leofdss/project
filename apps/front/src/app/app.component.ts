import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './core/store/app.state';

@Component({
  selector: 'project-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private store: Store<{ appState: AppState }>) {}
}
