import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomFormRoutingModule } from './custom-form-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { JsonFormComponent } from './components/json-form/json-form.component';
import { InputTextComponent } from './components/input-text/input-text.component';
import { InputPasswordComponent } from './components/input-password/input-password.component';
import { ScrollToInvalidFieldDirective } from './directives/scroll-to-invalid-field.directive';
import { CheckInputValidatyDirective } from './directives/check-input-validity.directive';

@NgModule({
  declarations: [
    JsonFormComponent,
    InputTextComponent,
    InputPasswordComponent,
    ScrollToInvalidFieldDirective,
    CheckInputValidatyDirective,
  ],
  imports: [
    CommonModule,
    CustomFormRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild(),
  ],
  exports: [JsonFormComponent],
})
export class CustomFormModule {}
