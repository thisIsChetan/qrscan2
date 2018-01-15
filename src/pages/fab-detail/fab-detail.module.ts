import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FabDetailPage } from './fab-detail';
import { ComponentsModule } from '../../components/components.module'

@NgModule({
  declarations: [
    FabDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FabDetailPage),
    ComponentsModule
  ],
})
export class FabDetailPageModule {}
