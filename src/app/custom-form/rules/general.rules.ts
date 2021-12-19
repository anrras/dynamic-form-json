import { FormGroup, Validators } from '@angular/forms';
import { RuleDTO, FieldDTO, FormDTO } from '@custom-form/models';
import { birthdayValidator } from '@custom-form/validators/birthday.validator';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

export function updateFormWithRules(
  rule: RuleDTO,
  field: FieldDTO,
  form: FormGroup,
  jsonFormData: FormDTO
) {
  if (rule.ruleType === 'ENABLED') {
    if (rule.strategyToCompare === 'VALUE') {
      form
        .get(rule.dependentFieldCode[0])
        .valueChanges.pipe(debounceTime(500), distinctUntilChanged())
        .subscribe((value) => {
          if (value === rule.valuesToCompare[0]) {
            form.get(field.id).enable({ emitEvent: false });
          }
        });
    }
    if (rule.strategyToCompare === 'FILLED') {
      form
        .get(rule.dependentFieldCode[0])
        .valueChanges.pipe(debounceTime(500), distinctUntilChanged())
        .subscribe((value) => {
          if (value) {
            form.get(field.id).enable({ emitEvent: false });
            form.get(field.id).updateValueAndValidity({ emitEvent: false });
          }
        });
    }
    // falta el or y el and
  }

  if (rule.ruleType === 'DISABLED') {
    if (rule.strategyToCompare === 'VALUE') {
      form
        .get(rule.dependentFieldCode[0])
        .valueChanges.pipe(debounceTime(500), distinctUntilChanged())
        .subscribe((value) => {
          if (value === rule.valuesToCompare[0]) {
            form.get(field.id).disable({ emitEvent: false });
          }
        });
    }
  }

  if (rule.ruleType === 'SHOW') {
    if (rule.strategyToCompare === 'VALUE') {
      form.get(rule.dependentFieldCode[0]).valueChanges.subscribe((value) => {
        if (value === rule.valuesToCompare[0]) {
          for (const step of jsonFormData.steps) {
            for (const section of step.sections) {
              for (const fieldAux of section.fields) {
                if (fieldAux.id === field.id) {
                  fieldAux.config.hidden = false;
                  jsonFormData = { ...jsonFormData };
                }
              }
            }
          }
        }
      });
    }
  }

  if (rule.ruleType === 'HIDE') {
    if (rule.strategyToCompare === 'VALUE') {
      form.get(rule.dependentFieldCode[0]).valueChanges.subscribe((value) => {
        if (value === rule.valuesToCompare[0]) {
          for (const step of jsonFormData.steps) {
            for (const section of step.sections) {
              for (const fieldAux of section.fields) {
                if (fieldAux.id === field.id) {
                  fieldAux.config.hidden = true;
                  jsonFormData = { ...jsonFormData };
                }
              }
            }
          }
        }
      });
    }
  }

  if (rule.ruleType === 'REQUIRED') {
    if (rule.strategyToCompare === 'VALUE') {
      form
        .get(rule.dependentFieldCode[0])
        .valueChanges.pipe(debounceTime(500), distinctUntilChanged())
        .subscribe((value) => {
          if (value === rule.valuesToCompare[0]) {
            form.get(field.id).setValidators([Validators.required]);
            form.get(field.id).updateValueAndValidity({ emitEvent: false });
          }
        });
    }
  }

  if (rule.ruleType === 'BIRTHDAY') {
    if (rule.strategyToCompare === 'VALUE') {
      form
        .get(rule.dependentFieldCode[0])
        .valueChanges.pipe(debounceTime(500), distinctUntilChanged())
        .subscribe((value) => {
          if (value) {
            form.get(field.id).setValidators([birthdayValidator(value)]);
            form.get(field.id).updateValueAndValidity({ emitEvent: false });
          }
        });
    }
  }
}
