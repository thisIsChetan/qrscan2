import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProcessPage } from './process';
import { ComponentsModule } from '../../components/components.module'
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProcessPage,
  ],
  imports: [
    IonicPageModule.forChild(ProcessPage),
    ComponentsModule,
    TranslateModule.forChild()
  ],
})
export class ProcessPageModule {
//   constructor(translate: TranslateService) {
    
//      translate.setDefaultLang('en');
//  }
}
