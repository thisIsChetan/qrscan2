import { Component, Input, Output, EventEmitter,ViewChild } from '@angular/core';

/**
 * Generated class for the AlertViewComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'alert-view',
  templateUrl: 'alert-view.html'
})
export class AlertViewComponent {
 
  @Input('text') text: string;
  @Input('contentText') contentText: string='';
  @Input('buttonText') buttonText: string;
  @Output() buttonClick = new EventEmitter();
  constructor() {
    console.log('Hello AlertViewComponent Component');
  }

  buttonclick(){
    this.buttonClick.emit();
  }


}
