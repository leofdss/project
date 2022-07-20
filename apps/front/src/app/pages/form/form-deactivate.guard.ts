import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanDeactivate } from '@angular/router';

import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { FormComponent } from './form.component';

@Injectable()
export class FormDeactivateGuard implements CanDeactivate<FormComponent> {
  constructor(private dialog: MatDialog) {}

  canDeactivate(component: FormComponent) {
    if (!component.saved) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        disableClose: true,
        data: 'Deseja sair sem salvar?',
      });
      return dialogRef.afterClosed();
    }
    return true;
  }
}
