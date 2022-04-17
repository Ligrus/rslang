import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromoComponent } from './promo.component';
import {RouterModule} from "@angular/router";
import {AntDesignModule} from "../ant-design.module";

@NgModule({
  declarations: [
    PromoComponent
  ],
  imports: [
    CommonModule,
    AntDesignModule,
    RouterModule.forChild([{
      path: '',
      component: PromoComponent
    }])
  ],
  exports: [PromoComponent]
})
export class PromoModule { }
