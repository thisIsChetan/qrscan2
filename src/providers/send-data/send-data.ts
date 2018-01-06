import {Http, Headers} from '@angular/http';
import { Injectable } from '@angular/core';
import { GLOBALS } from '../../data/globals'

/*
  Generated class for the SendDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SendDataProvider {

  constructor(public http: Http) {
    console.log('Hello SendDataProvider Provider');
  }

  send(postData){
    let headers = new Headers({ 
        'Content-Type': 'application/json'
    });
    let data = postData

    return this.http.post(GLOBALS.BARCODE_URL, data,{headers : headers})
    .map(res => res.json())

}

}
