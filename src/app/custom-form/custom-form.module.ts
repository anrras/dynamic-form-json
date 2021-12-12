import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomFormRoutingModule } from './custom-form-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { JsonFormComponent } from './components/json-form/json-form.component';
import { InputTextComponent } from './components/input-text/input-text.component';
import { InputPasswordComponent } from './components/input-password/input-password.component';

@NgModule({
  declarations: [JsonFormComponent, InputTextComponent, InputPasswordComponent],
  imports: [CommonModule, CustomFormRoutingModule, ReactiveFormsModule],
  exports: [JsonFormComponent],
})
export class CustomFormModule {}
