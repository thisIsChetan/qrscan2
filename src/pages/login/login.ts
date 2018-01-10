import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Cordova } from '@ionic-native/core';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthServiceProvider]
})
export class LoginPage {

  password: string='';
  errorMsg:string='';
  constructor( public navCtrl: NavController,
               public navParams: NavParams, 
               public authServiceProvider: AuthServiceProvider,
               private platform: Platform ) {
                 console.log("hjfggh");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    
  }

  navigateToProcess() {
  
    if(this.password.length == 4){

    if((this.platform.is('core') || this.platform.is('mobileweb'))) {
      this.navCtrl.setRoot("ProcessPage");
    }else{
      this.authServiceProvider.isValid(this.password).then((data:any)=>{
        console.log(data);
        if(data){
          if(data.status == "OK"){
          this.navCtrl.setRoot("ProcessPage");
          }
          else{
           this.errorMsg="Wrong Password";
          }
        }
      }).catch((err)=>{
       this.errorMsg="Something went wrong.";
      }) 
     
    }
  }
  else{
    this.errorMsg="Length not match";
  }
  
  }
}
