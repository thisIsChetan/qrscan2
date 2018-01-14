import { Injectable } from '@angular/core';
import { GLOBALS } from '../../data/globals'
import { HTTP } from '@ionic-native/http';

/*
  Generated class for the TermsOfUseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TermsOfUseProvider {

  constructor(public http: HTTP) {
    console.log('Hello TermsOfUseProvider Provider');
  }

getTerms(){

  let url = GLOBALS.TREMS_OF_USE;
 
  console.log("Termsofuse", url)
    return new Promise((resolve, reject)=>{

      let headers = {};
      this.http.setDataSerializer("json");
      this.http.setHeader("Accept", "application/json");
      this.http.setHeader("Content-Type", "application/json");
      this.http.useBasicAuth(GLOBALS.API_AUTH_UNAME,GLOBALS.API_AUTH_PW);
      this.http.get(url,{}, headers).then((res)=>{
        console.log(res);
        let data = JSON.parse(res.data); 
        console.log(data.items[0].fields.termsOfUseContent);
        resolve("https:" + data.items[0].fields.termsOfUseContent);
      }).catch((err)=>{
        reject(err);
      })
    })

}
}
