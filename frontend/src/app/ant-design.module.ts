import { NgModule } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSpinModule } from 'ng-zorro-antd/spin';


@NgModule({
  exports: [
    NzCheckboxModule,
    NzInputModule,
    NzLayoutModule,
    NzMenuModule,
    NzGridModule,
    NzSpaceModule,
    NzTypographyModule,
    NzIconModule,
    NzButtonModule,
    NzToolTipModule,
    NzModalModule,
    NzFormModule,
    NzRadioModule,
    NzTabsModule,
    NzDividerModule,
    NzAvatarModule,
    NzDropDownModule,
    NzCardModule,
    NzPageHeaderModule,
    NzProgressModule,
    NzStatisticModule,
    NzBreadCrumbModule,
    NzInputNumberModule,
    NzSpinModule
  ],
  imports: [
    NzCheckboxModule,
    NzInputModule,
    NzLayoutModule,
    NzMenuModule,
    NzGridModule,
    NzSpaceModule,
    NzTypographyModule,
    NzIconModule,
    NzButtonModule,
    NzToolTipModule,
    NzModalModule,
    NzFormModule,
    NzRadioModule,
    NzTabsModule,
    NzDividerModule,
    NzAvatarModule,
    NzDropDownModule,
    NzCardModule,
    NzPageHeaderModule,
    NzProgressModule,
    NzStatisticModule,
    NzBreadCrumbModule,
    NzInputNumberModule,
    NzSpinModule
  ],
  providers: [NzMessageService],
})
export class AntDesignModule {}
