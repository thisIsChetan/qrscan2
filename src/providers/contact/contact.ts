import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { GLOBALS } from '../../data/globals'
import { HTTP } from '@ionic-native/http';
/*
  Generated class for the ContactProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContactProvider {

  constructor(private http: HTTP) {
    console.log('Hello contactProvider Provider');
  }


  getData(){

    this.http.setHeader("Accept", "application/json");
    this.http.setHeader("Content-Type", "application/json");

    this.http.get(GLOBALS.CONTACT_INFO, {}, {})
    .then(data => {
      console.log(data.data); // data received by server

    })
    .catch(error => {
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
  
    });
  }
}
