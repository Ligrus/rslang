import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsIntroComponent } from './cards-intro/cards-intro.component';
import { AntDesignModule } from '../ant-design.module';
import { CardsLearningComponent } from './cards-learning/cards-learning.component';
import { CardComponent } from './card/card.component';
import { RouterModule } from '@angular/router';
import { CardWordExampleDirective } from './directives/card-word-example.directive';
import { CardWordInputComponent } from './card/card-word-input/card-word-input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CardsIntroComponent,
    CardsLearningComponent,
    CardComponent,
    CardWordExampleDirective,
    CardWordInputComponent,
  ],
  imports: [
    RouterModule.forChild([
      { path: '', component: CardsIntroComponent },
      { path: 'learn', component: CardsLearningComponent },
    ]),
    CommonModule,
    AntDesignModule,
    FormsModule,
  ],
  exports: [CardsIntroComponent],
})
export class CardsModule {}
