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
      import('../home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    redirectTo: '/promo',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
