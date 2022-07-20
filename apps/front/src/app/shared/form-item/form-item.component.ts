import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'project-form-item',
  templateUrl: 'form-item.component.html',
  styleUrls: ['form-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormItemComponent {
  @Input() form?: FormGroup<{
    uuid: FormControl<string | null | undefined>;
    name: FormControl<string | null | undefined>;
    age: FormControl<number | null | undefined>;
  }>;

  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
}
