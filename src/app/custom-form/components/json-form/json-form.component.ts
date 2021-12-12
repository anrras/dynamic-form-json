import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormDTO, FieldDTO } from '../../models';

@Component({
  selector: 'app-json-form',
  templateUrl: './json-form.component.html',
  styleUrls: ['./json-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonFormComponent implements OnChanges {
  @Input() jsonFormData: FormDTO;
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.jsonFormData.firstChange) {
      console.log(this.jsonFormData);
      this.createForm(this.jsonFormData);
    }
  }

  createForm(form: any) {
    for (const step of form.steps) {
      if (step.type === 'GROUP') {
        const newGroup = new FormGroup({});

        step.sections.map((section: any) => {
          section.fields.map((field: any) => {
            let validatorsToAdd = this.createValidators(field);
            const newControl = new FormControl(
              field.config.value,
              validatorsToAdd
            );
            newGroup.addControl(field.id, newControl);
          });
        });

        this.form.addControl(step.id, newGroup);
      } else if (step.type === 'ARRAY') {
        const newArray = new FormArray([]);
        const oneGroup = new FormGroup({});

        step.sections.map((section: any) => {
          section.fields.map((field: any) => {
            let validatorsToAdd = this.createValidators(field);
            const newControl = new FormControl(
              field.config.value,
              validatorsToAdd
            );
            oneGroup.addControl(field.id, newControl);
          });
        });

        newArray.push(oneGroup);
        this.form.addControl(step.id, newArray);
      }
    }
  }

  createValidators(field: FieldDTO) {
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
          //   value.map((pattern: any) => {
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

  getFormArray(key: string) {
    return <FormArray>this.form.controls[key];
  }

  addArrayGroup(arrayName: string, fields: any) {
    const control = this.getFormArray(arrayName);
    const oneGroup = new FormGroup({});
    fields.map((field: any) => {
      oneGroup.addControl(field.id, new FormControl());
    });
    control.push(oneGroup);
  }

  removeArrayGroup(arrayName: string, index: number) {
    const control = this.getFormArray(arrayName);
    control.removeAt(index);
  }

  submitForm() {
    console.log('Form valid: ', this.form.valid);
    console.log('Form values: ', this.form.value);
  }

  // updateValuesOnFormDetails() {
  //   for (const step of this.jsonFormData.steps) {
  //     for (const section of step.sections) {
  //       for (const field of section.fields) {
  //         if (field.type === FieldTypeEnum.DATE) {
  //           let dateValue = this.form.value[field.fieldCode];
  //           field.value = dateValue ? dateValue : '';
  //         } else if (field.type === FieldTypeEnum.LIST) {
  //           for (const fieldList of field.fieldList) {
  //             if (fieldList.type === FieldTypeEnum.DATE) {
  //               let dateValue =
  //                 this.form.value[field.fieldCode][fieldList.fieldCode];
  //               fieldList.value = dateValue ? dateValue : '';
  //             } else if (fieldList.type === FieldTypeEnum.LIST) {
  //               for (const list of fieldList.fieldList) {
  //                 list.value =
  //                   this.form.value[field.fieldCode] &&
  //                   this.form.value[field.fieldCode][fieldList.fieldCode]
  //                     ? this.form.value[field.fieldCode][fieldList.fieldCode][
  //                         list.fieldCode
  //                       ]
  //                     : undefined;
  //               }
  //             } else {
  //               fieldList.value = this.form.value[field.fieldCode]
  //                 ? this.form.value[field.fieldCode][fieldList.fieldCode]
  //                 : undefined;
  //             }
  //           }
  //         } else {
  //           field.value = this.form.value[field.fieldCode];
  //         }
  //       }
  //     }
  //   }
  // }
}
