
import { Injectable } from '@angular/core';
import {FabContainer, ModalController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { GLOBALS } from '../../data/globals'

/*
  Generated class for the FabButtonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FabButtonProvider {

  constructor(public modalCtrl: ModalController,
              public http: HTTP) {
    console.log('Hello FabButtonProvider Provider');
  }

  showPrivacy(fab: FabContainer) {
    console.log("Privacy")
    fab.close();
    let myModal = this.modalCtrl.create("FabDetailPage",{ 'type': "Privacy" });
    myModal.present();   
  }


  showContact(fab: FabContainer){
    console.log("Contact");
    fab.close();
    let myModal = this.modalCtrl.create("FabDetailPage",{ 'type': "Contact" });
    myModal.present();

  }



  getData(type){
    return new Promise((resolve, reject) => {
      let url:string;
      if(type == "Privacy"){
          url = GLOBALS.PRIVACY
        }else if(type == "Contact"){
          url = GLOBALS.CONTACT_INFO
      }
      let headers = {};
      this.http.setDataSerializer("json");
      this.http.setHeader("Accept", "application/json");
      this.http.setHeader("Content-Type", "application/json");
      this.http.useBasicAuth(GLOBALS.API_AUTH_UNAME,GLOBALS.API_AUTH_PW);
      this.http.get(url, {}, {})
      .then(data => {
        console.log(data.data); // data received by server
        
        let returnValue:string;
        if(type == "Privacy"){
          returnValue = JSON.parse(data.data).items[0].fields["privacyContent"]
        }else if(type == "Contact"){
          returnValue = JSON.parse(data.data).items[0].fields["contactInformationContent"]
        }
        
        console.log(returnValue); // data received by server
        resolve(returnValue);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
    })

  }

  

}
