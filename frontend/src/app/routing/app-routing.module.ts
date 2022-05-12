import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: 'promo',
    loadChildren: () =>
      import('../promo/promo.module').then((m) => m.PromoModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('../cards/cards.module').then((m) => m.CardsModule),
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
