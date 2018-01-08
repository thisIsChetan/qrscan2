import { Component } from '@angular/core';

/**
 * Generated class for the FabIonComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'fab-ion',
  templateUrl: 'fab-ion.html'
})
export class FabIonComponent {

  text: string;

  constructor() {
    console.log('Hello FabIonComponent Component');
    this.text = 'Hello World';
  }

}
