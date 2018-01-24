import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { Injectable } from '@angular/core';
// import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { GLOBALS } from '../../data/globals';
import { HTTP } from '@ionic-native/http';


/*
  Generated class for the BarcodeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BarcodeProvider {

  productData={
    "0110614141543219103456789213456789012":{
      "productName":"glimepiride",
      "Dose":"5gm"
    }
  };
  constructor(private barcodeScanner: BarcodeScanner,
              private http: HTTP) {
    console.log('Hello BarcodeProvider Provider');
  }

  showAlert(){
    alert("Code is scanning");
  }
  scan(){
    return new Promise((resolve, reject)=>{
      let options: BarcodeScannerOptions = {};
      options.formats = "DATA_MATRIX";
      console.log("Sacnning Barcode...");
      this.barcodeScanner.scan(options).then((barcodeData) => {
        resolve(barcodeData);
       }).catch((err) => {
        reject(err);
       })
    })
  }

 

  validate(barcodeData){
    return new Promise((resolve, reject)=>{

      console.log("Barcode Scanned", barcodeData);
     
      let headers = {};
      let data = {          
          "product_code": barcodeData.text
      }
  
      this.http.setDataSerializer("json");
      this.http.setHeader("Accept", "application/json");
      this.http.setHeader("Content-Type", "application/json");
      this.http.useBasicAuth(GLOBALS.API_AUTH_UNAME,GLOBALS.API_AUTH_PW);
      this.http.post(GLOBALS.BARCODE_URL, data, headers).then((res: any)=>{
        console.log("ExceededData:"+JSON.parse(res.data).Frequency_exceeded +"Exists:"+JSON.parse(res.data).Exists);
        // 1.ee sys err 1.e call/auth faild
        // Exists   Frequency_exceeded
        // t          t => 1.ee
        // t          f => 1.s
        // f          t => 1.e
        // f          f => 1.e
        //

        let exist = JSON.parse(res.data).Exists;
        let freq = JSON.parse(res.data).Frequency_exceeded;
        if(exist == 'true' && freq == 'true'){
          resolve('1.ee');
        }else if(exist == 'true' && freq == 'false'){
          resolve('1.s');
        }else if(exist == 'false'){
          resolve('1.e');
        }
       
      }).catch((err)=>{
        console.log("Error MSG:"+err);
        reject(err);
      })
    })
  }


}
