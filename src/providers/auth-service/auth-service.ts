import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { GLOBALS } from '../../data/globals'

/*
  Generated class for the AuthServiceProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class AuthServiceProvider {
  
  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }

  isValid(credentials){

      // let headers= new Headers();
      // headers.append('Content-Type', 'application/json');
      // headers.append("Accept", 'application/json');
      // headers.append('Access-Control-Allow-Origin', '*');
      let headers = new Headers({ 
        'Content-Type': 'application/json'
     });
      let data = {
        app_authentication_code: credentials
      }

      return this.http.post(GLOBALS.AUTH_URL, data,{headers : headers})
      .map(res => res.json())

  }


}
