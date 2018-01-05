import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { GLOBALS } from '../../data/globals'


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
              private http: Http) {
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

      console.log("Barcode Scanned", barcodeData);
      let headers = new Headers({ 
          'Content-Type': 'application/json'
      });
      let data = {          
          "product_code": barcodeData.text
      }
      return this.http.post(GLOBALS.BARCODE_URL, data,{headers : headers})
      .map((res) =>{
        console.log(res);
        res = res.json();
        return res[0].exists
      })


  }


}
