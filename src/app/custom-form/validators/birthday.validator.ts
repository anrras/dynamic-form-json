import { AbstractControl } from '@angular/forms';

export function birthdayValidator(date: string) {
  return (control: AbstractControl) => {
    const value = control.value;
    const actualDate = new Date(date);
    const valueToDate = new Date(value);
    if (actualDate.getFullYear() - valueToDate.getFullYear() < 18) {
      return { isYoung: true };
    } else {
      if (actualDate.getMonth() < valueToDate.getMonth()) {
        return { isYoung: true };
      } else {
        if (actualDate.getDate() < valueToDate.getDate()) {
          return { isYoung: true };
        }
      }
    }

    return null;
  };
}
