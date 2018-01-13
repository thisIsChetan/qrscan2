import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Cordova } from '@ionic-native/core';
import { ContactProvider } from "../../providers/contact/contact";

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
  view:string='1';
  txt:string="聯絡我們\n歡迎您寶貴的意見, 禮來公司關心您的健康。\n\n台灣禮來股份有限公司\n\n台北總公司：\n台北市復興北路365號11樓\n電話： (02)27152950 \n傳真： (02)27163314\n\n回報違反道德行為或疑慮 ：\n\n如果您認為禮來員工在執行業務過程中未能符合法規，或未遵循禮來公司核心價值，請主動撥打禮來全球Ethics and Compliance熱線00801-13-7956，或是透過 www.lillyethics.ethicspoint.com 做線上回報來告訴我們。請注意，如果您是從美國以外的地區回報，您所提交的報告的將會依當地分公司的流程進行處理。";
  constructor( public navCtrl: NavController,
               public navParams: NavParams, 
               public authServiceProvider: AuthServiceProvider,
               public contactProvider:ContactProvider,
               private platform: Platform ) {
               this.view ='1';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    
  }

  contact(){
    this.view='2';
    this.contactProvider.getData();
  }

  reset(){
    this.view='1';
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
       this.errorMsg="Please check your network connection.";
      }) 
     
    }
  }
  else{
    this.errorMsg="Length not match";
  }
  
  }
}
