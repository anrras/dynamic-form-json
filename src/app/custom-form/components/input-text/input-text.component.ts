import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputTextComponent,
      multi: true,
    },
  ],
})
export class InputTextComponent implements ControlValueAccessor {
  private onChangeFn!: Function;
  private onTouchFn!: Function;

  @Input() field: any;
  public valueInput = new FormControl('');

  constructor() {}

  writeValue(obj: any): void {
    this.valueInput.setValue(obj);
  }
  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchFn = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.valueInput.disable();
    } else {
      this.valueInput.enable();
    }
  }

  changeText() {
    this.onChangeFn(this.valueInput.value);
  }
}
