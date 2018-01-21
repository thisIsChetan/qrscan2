import { Component } from '@angular/core';

/**
 * Generated class for the CheckConnectionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'check-connection',
  templateUrl: 'check-connection.html'
})
export class CheckConnectionComponent {

  text: string;

  constructor() {
    console.log('Hello CheckConnectionComponent Component');
    this.text = 'Hello World';
  }

}
