import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsIntroComponent } from './cards-intro/cards-intro.component';
import { AntDesignModule } from '../ant-design.module';

@NgModule({
  declarations: [
    CardsIntroComponent
  ],
  imports: [
    CommonModule,
    AntDesignModule
  ],
  exports: [CardsIntroComponent]
})
export class CardsModule { }
