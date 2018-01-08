import { NgModule } from '@angular/core';
import { AlertViewComponent } from './alert-view/alert-view';
import { IonicPageModule } from 'ionic-angular';
import { FabIonComponent } from './fab-ion/fab-ion';
@NgModule({
	declarations: [AlertViewComponent,
    FabIonComponent],
	imports: [IonicPageModule.forChild(AlertViewComponent)],
	exports: [AlertViewComponent,
    FabIonComponent]
})
export class ComponentsModule {}
