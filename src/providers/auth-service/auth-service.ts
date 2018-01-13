import {Injectable} from '@angular/core';
// import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { GLOBALS } from '../../data/globals'
import { HTTP } from '@ionic-native/http';

/*
  Generated class for the AuthServiceProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class AuthServiceProvider {
  
  constructor(private http: HTTP) {
    console.log('Hello AuthServiceProvider Provider');
  }

  // isValid(credentials){
  //     let headers = new Headers({ 
  //       'Content-Type': 'application/json'
  //    });
  //     let data = {
  //       app_authentication_code: credentials
  //     }

  //     return this.http.post(GLOBALS.AUTH_URL, data,{headers : headers})
  //     .map(res => res.json())

  // }
  isValid(credentials){

    return new Promise((resolve, reject)=>{      
      let headers = {
      };
      let data = {
        app_authentication_code: credentials
      }

      this.http.setDataSerializer("json");
      this.http.setHeader("Accept", "application/json");
      this.http.setHeader("Content-Type", "application/json");
      // this.http.getBasicAuthHeader(GLOBALS.API_AUTH_UNAME,GLOBALS.API_AUTH_PW);
      this.http.useBasicAuth(GLOBALS.API_AUTH_UNAME,GLOBALS.API_AUTH_PW);
      this.http.post(GLOBALS.AUTH_URL, data, headers).then((res)=>{
        console.log(res);
        // alert(JSON.stringify(data.data));
        resolve(JSON.parse(res.data));
      }).catch((err)=>{
        reject(err);
      })
    })

  }

}
