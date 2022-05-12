import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthRegisterComponent } from './auth-register/auth-register.component';
import { AntDesignModule } from '../ant-design.module';
import { SharedModule } from '../shared/shared.module';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
@NgModule({
  declarations: [
    AuthLoginComponent,
    AuthRegisterComponent,
    AuthModalComponent,
  ],
  imports: [
    CommonModule,
    AntDesignModule,
    SharedModule,
  ],
  exports: [AuthLoginComponent, AuthRegisterComponent, AuthModalComponent]
})
export class AuthModule { }
