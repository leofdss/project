import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CrudComponent } from './crud.component';

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
  ],
})
export class CrudModule {}
