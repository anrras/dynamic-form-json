import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomFormRoutingModule } from './custom-form-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { JsonFormComponent } from './components/json-form/json-form.component';

@NgModule({
  declarations: [JsonFormComponent],
  imports: [CommonModule, CustomFormRoutingModule, ReactiveFormsModule],
  exports: [JsonFormComponent],
})
export class CustomFormModule {}
