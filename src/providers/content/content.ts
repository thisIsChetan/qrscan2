import {Http, Headers} from '@angular/http';
import { Injectable } from '@angular/core';
import { GLOBALS } from '../../data/globals'

/*
  Generated class for the ContentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContentProvider {

  constructor(public http: Http) {
    console.log('Hello ContentProvider Provider');
  }

  getImgURL(imgType: string){
    let idx =  0;
    if(imgType == '20mg'){
      idx = 0;
    }else{
      idx = 1;
    }
    console.log("SDFGGFGDFGDFGDFSGDFSGDSFGDFSGDFGDFGDF", idx)
      return this.http.get(GLOBALS.IMG_URL)
      .map((res:any) =>{
        console.log(res);
        res = res.json();
        return "https:" + res.includes.Asset[idx].fields.file.url;
      })
  }

}
