import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormDTO } from '../../models';

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
            const newControl = new FormControl();
            newGroup.addControl(field.id, newControl);
          });
        });

        this.form.addControl(step.id, newGroup);
      } else if (step.type === 'ARRAY') {
        const newArray = new FormArray([]);
        const oneGroup = new FormGroup({});

        step.sections.map((section: any) => {
          section.fields.map((field: any) => {
            const newControl = new FormControl();
            oneGroup.addControl(field.id, newControl);
          });
        });

        newArray.push(oneGroup);
        this.form.addControl(step.id, newArray);
      }
    }
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
