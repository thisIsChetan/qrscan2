// import {Http, Headers} from '@angular/http';
import { Injectable } from '@angular/core';
import { GLOBALS } from '../../data/globals';
import { HTTP } from '@ionic-native/http';

/*
  Generated class for the SendDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SendDataProvider {

  constructor(public http: HTTP) {
    console.log('Hello SendDataProvider Provider');
  }

  send(postData){

    return new Promise((resolve, reject)=>{
      let headers = {};
      this.http.setDataSerializer("json");
      this.http.setHeader("Accept", "application/json");
      this.http.setHeader("Content-Type", "application/json");
      this.http.useBasicAuth(GLOBALS.API_AUTH_UNAME,GLOBALS.API_AUTH_PW);
      this.http.post(GLOBALS.AUTH_URL, postData, headers).then((res)=>{
        console.log(res);
        // alert(JSON.stringify(data.data));
        resolve(JSON.parse(res.data));
      }).catch((err)=>{
        reject(err);
      })
    })

}

}
