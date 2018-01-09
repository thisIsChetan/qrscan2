// import {Http, Headers} from '@angular/http';
import { Injectable } from '@angular/core';
import { GLOBALS } from '../../data/globals'
import { HTTP } from '@ionic-native/http';

/*
  Generated class for the ContentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContentProvider {

  constructor(public http: HTTP) {
    console.log('Hello ContentProvider Provider');
  }

  getImgURL(imgType: string){
    let url = ''
    if(imgType == '20mg'){
      url = GLOBALS.IMG_URL_20mg;
    }else{
      url = GLOBALS.IMG_URL_5mg;
    }
    console.log("SDFGGFGDFGDFGDFSGDFSGDSFGDFSGDFGDFGDF", url)
      // return this.http.get(GLOBALS.IMG_URL)
      // .map((res:any) =>{
      //   console.log(res);
      //   res = res.json();
      //   return "https:" + res.includes.Asset[idx].fields.file.url;
      // })

      return new Promise((resolve, reject)=>{

        let headers = {};
        this.http.setDataSerializer("json");
        this.http.setHeader("Accept", "application/json");
        this.http.setHeader("Content-Type", "application/json");
        this.http.get(url,{}, headers).then((res)=>{
          console.log(res);
          let data = JSON.parse(res.data); 
          console.log(data);
          resolve("https:" + data.includes.Asset[0].fields.file.url);
        }).catch((err)=>{
          reject(err);
        })
      })
  }

}
