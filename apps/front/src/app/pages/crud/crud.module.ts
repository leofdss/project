import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

import { CrudComponent } from './crud.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CrudComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CrudComponent,
        children: [],
      },
    ]),
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    TranslateModule,
  ],
})
export class CrudModule {}
