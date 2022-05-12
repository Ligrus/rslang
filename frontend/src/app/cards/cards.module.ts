import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsIntroComponent } from './cards-intro/cards-intro.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CardsIntroComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: CardsIntroComponent
    }])
  ]
})
export class CardsModule { }
