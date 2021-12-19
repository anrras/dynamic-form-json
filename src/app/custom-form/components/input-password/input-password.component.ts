import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Optional,
  Self,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NgControl,
} from '@angular/forms';
import { FieldDTO } from '@custom-form/models';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPasswordComponent implements ControlValueAccessor {
  private onChangeFn: Function;
  private onTouchFn: Function;
  @Input()
  public parentForm: FormGroup;

  @Input() field: FieldDTO;
  public valueInput: any;

  public value = new FormControl(null);
  public disabled: boolean;

  constructor(@Self() @Optional() private control: NgControl) {
    this.control.valueAccessor = this;
  }

  writeValue(value: any): void {
    // this.valueInput = value;
    this.value.patchValue(value);
  }
  registerOnChange(fn: any): void {
    // this.onChangeFn = fn;
    this.value.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this.onTouchFn = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    // this.disabled = isDisabled;
    if (isDisabled) {
      this.value.disable({ emitEvent: false });
    } else {
      this.value.enable({ emitEvent: false });
    }
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
