import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProcessPage } from './process';
import { ComponentsModule } from '../../components/components.module'

@NgModule({
  declarations: [
    ProcessPage,
  ],
  imports: [
    IonicPageModule.forChild(ProcessPage),
    ComponentsModule
  ],
})
export class ProcessPageModule {}
