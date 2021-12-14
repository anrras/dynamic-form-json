import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputPasswordComponent,
      multi: true,
    },
  ],
})
export class InputPasswordComponent implements ControlValueAccessor {
  private onChangeFn!: Function;
  private onTouchFn!: Function;

  @Input() field: any;
  @Input() control: any;
  public valueInput: string;
  public isDisabledValue: boolean;

  constructor() {}

  writeValue(value: any): void {
    this.valueInput = value;
  }
  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchFn = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabledValue = isDisabled;
  }

  changeText() {
    this.onChangeFn(this.valueInput);
  }
}
