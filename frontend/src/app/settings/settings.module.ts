import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import { RouterModule } from '@angular/router';
import { AntDesignModule } from '../ant-design.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingsFormComponent } from './settings-form/settings-form.component';



@NgModule({
  declarations: [
    SettingsComponent,
    SettingsFormComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: '', component: SettingsComponent },
    ]),
    CommonModule,
    AntDesignModule,
    ReactiveFormsModule
  ],
  exports: [
    SettingsComponent
  ]
})
export class SettingsModule { }
