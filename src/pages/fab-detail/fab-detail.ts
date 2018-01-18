import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { FabButtonProvider } from "../../providers/fab-button/fab-button" 

/**
 * Generated class for the FabDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fab-detail',
  templateUrl: 'fab-detail.html',
})
export class FabDetailPage {
  content: string;
  type: string;
  head:string;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public viewCtrl: ViewController,
              public fabButton: FabButtonProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FabDetailPage');
    this.type = this.navParams.get('type');
    this.fabButton.getData(this.type).then((data: string)=>{
      this.content = data;
    })
    if(this.type == "Privacy"){
      this.head="隱私權";
      
    }else if(this.type == "Contact"){
      this.head="連絡我們";
    }
  }

  exit(){
    this.viewCtrl.dismiss();
  }

}
