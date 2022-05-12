import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AntDesignModule } from '../ant-design.module';
import { ModalComponent } from './components/modal/modal.component';
@NgModule({
  exports: [
    ModalComponent,
    FormsModule,
    ReactiveFormsModule,
    AntDesignModule,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AntDesignModule
  ],
  declarations: [
    ModalComponent
  ]
})
export class SharedModule {}
