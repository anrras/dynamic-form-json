import { Validators } from '@angular/forms';
import { FieldDTO } from '@custom-form/models';

export function createValidators(field: FieldDTO) {
  const validatorsToAdd = [];
  if (field.validators) {
    for (const [key, value] of Object.entries(field.validators)) {
      switch (key) {
        case 'min':
          validatorsToAdd.push(Validators.min(value));
          break;
        case 'max':
          validatorsToAdd.push(Validators.max(value));
          break;
        case 'required':
          if (value) {
            validatorsToAdd.push(Validators.required);
          }
          break;
        case 'requiredTrue':
          if (value) {
            validatorsToAdd.push(Validators.requiredTrue);
          }
          break;
        case 'email':
          if (value) {
            validatorsToAdd.push(Validators.email);
          }
          break;
        case 'minLength':
          validatorsToAdd.push(Validators.minLength(value));
          break;
        case 'maxLength':
          validatorsToAdd.push(Validators.maxLength(value));
          break;
        // case 'pattern':
        //   value.forEach((pattern: any) => {
        //     validatorsToAdd.push(
        //       patternValidator(pattern.regex, pattern.error)
        //     );
        //   });
        //   break;

        default:
          break;
      }
    }
  }
  return validatorsToAdd;
}
