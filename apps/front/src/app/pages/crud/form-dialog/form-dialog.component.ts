import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from '@project/api-interfaces';

@Component({
  templateUrl: 'form-dialog.component.html',
  styleUrls: ['form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: Item
  ) {
    if (data) {
      this.form.patchValue(data);
    }
  }

  form = new FormGroup({
    uuid: new FormControl<string | undefined>(undefined),
    name: new FormControl<string | undefined>(undefined, [Validators.required]),
    age: new FormControl<number | undefined>(undefined, [Validators.required]),
  });

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
