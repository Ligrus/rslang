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

@NgModule({
  exports: [NzLayoutModule, NzMenuModule, NzGridModule, NzSpaceModule, NzTypographyModule, NzIconModule, NzButtonModule, NzToolTipModule, NzModalModule, NzFormModule],
  imports: [NzLayoutModule, NzMenuModule, NzGridModule, NzSpaceModule, NzTypographyModule, NzIconModule, NzButtonModule, NzToolTipModule, NzModalModule, NzFormModule]
})
export class AntDesignModule { }
