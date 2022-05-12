import { NgModule } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from "ng-zorro-antd/menu";
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
    NzTabsModule
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
    NzTabsModule
  ],
  providers: [NzMessageService]
})
export class AntDesignModule { }
