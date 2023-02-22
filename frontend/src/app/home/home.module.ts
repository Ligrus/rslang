import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { AntDesignModule } from '../ant-design.module';
import { RouterModule } from '@angular/router';
import { CardsIntroComponent } from '../cards/cards-intro/cards-intro.component';
import { CardsModule } from '../cards/cards.module';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { SettingsModule } from '../settings/settings.module';

@NgModule({
  declarations: [HomeLayoutComponent, UserMenuComponent],
  imports: [
    CommonModule,
    AntDesignModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeLayoutComponent,
        children: [
          {
            path: 'cards',
            loadChildren: () => CardsModule,
          },
          { path: 'settings', loadChildren: () => SettingsModule, },
          { path: '', pathMatch: 'full', redirectTo: 'cards' },
          { path: 'dictionary', component: CardsIntroComponent },
          { path: 'statistics', component: CardsIntroComponent },
          { path: 'games', component: CardsIntroComponent },
        ],
      },
    ]),
  ],
})
export class HomeModule {}
