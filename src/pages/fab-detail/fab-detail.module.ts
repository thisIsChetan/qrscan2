import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FabDetailPage } from './fab-detail';
import { ComponentsModule } from '../../components/components.module'
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    FabDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FabDetailPage),
    ComponentsModule,
    TranslateModule.forChild()
  ],
})
export class FabDetailPageModule {}
