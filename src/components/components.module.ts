import { NgModule } from '@angular/core';
import { AlertViewComponent } from './alert-view/alert-view';
import { IonicPageModule } from 'ionic-angular';
@NgModule({
	declarations: [AlertViewComponent],
	imports: [IonicPageModule.forChild(AlertViewComponent)],
	exports: [AlertViewComponent]
})
export class ComponentsModule {}
