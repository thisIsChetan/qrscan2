import { NgModule } from '@angular/core';
import { AlertViewComponent } from './alert-view/alert-view';
import { IonicPageModule } from 'ionic-angular';
import { CheckConnectionComponent } from './check-connection/check-connection';

@NgModule({
	declarations: [AlertViewComponent,
    CheckConnectionComponent],
	imports: [IonicPageModule.forChild(AlertViewComponent)],
	exports: [AlertViewComponent,
    CheckConnectionComponent]
})
export class ComponentsModule {}
