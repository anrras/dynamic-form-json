import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Optional,
  Self,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPasswordComponent implements ControlValueAccessor {
  private onChangeFn: Function;
  private onTouchFn: Function;

  @Input() field: any;
  public valueInput: any;
  public disabled: boolean;

  constructor(@Self() @Optional() private control: NgControl) {
    this.control.valueAccessor = this;
  }

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
    this.disabled = isDisabled;
  }

  changeText(event) {
    this.valueInput = event.target.value;
    this.onTouchFn();
    this.onChangeFn(this.valueInput);
  }

  public get invalid(): boolean {
    return this.control.invalid;
  }

  public get hasError(): boolean {
    const { dirty, touched } = this.control;

    return this.invalid && (dirty || touched);
  }

  get errors() {
    const control = this.control && this.control.control;
    if (control) {
      return control.touched && control.errors;
    }
    return null;
  }
}
