import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from '../../shared/confirm-dialog/confirm-dialog.module';

import { FormItemModule } from '../../shared/form-item/form-item.module';
import { FormDeactivateGuard } from './form-deactivate.guard';
import { FormResolverGuard } from './form-resolve.guard';
import { FormComponent } from './form.component';

@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: ':uuid',
        component: FormComponent,
        resolve: [FormResolverGuard],
        canDeactivate: [FormDeactivateGuard],
        children: [],
      },
    ]),
    FormItemModule,
    MatDialogModule,
    ConfirmDialogModule,
  ],
  providers: [FormDeactivateGuard, FormResolverGuard],
})
export class FormModule {}
