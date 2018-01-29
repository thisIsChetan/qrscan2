import { Component, ViewChild } from '@angular/core';
import { FabContainer } from 'ionic-angular';
import { IonicPage, NavController, NavParams, Platform, Slides, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ContactProvider } from "../../providers/contact/contact";
import { TermsOfUseProvider } from "../../providers/terms-of-use/terms-of-use";
import { Storage } from '@ionic/storage';
import { ProcessPage } from '../process/process';
import { FabButtonProvider } from "../../providers/fab-button/fab-button"
import { TranslateService } from '@ngx-translate/core';

declare var cordova: any;
/*
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',

  providers: [AuthServiceProvider, TermsOfUseProvider]
})
export class LoginPage {

  @ViewChild(Slides) slides: Slides;

  password: string = '';
  version: string = '';
  errorMsg: string = '';
  view: string = '1';
  termsOfUse: string = '';
  currentIndex: number = 0;
  next: string = '';
  disagreeTitle:string;
  okBtn:string;
  networkError:string;
  wrongPassword:string;
  isenable: boolean = false;
  userData = {
    userPass: '',
    version: ''
  }

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public authServiceProvider: AuthServiceProvider,
    public contactProvider: ContactProvider,
    public termsOfUseProvide: TermsOfUseProvider,
    private platform: Platform,
    private translate: TranslateService,
    public alertCtrl: AlertController,
    private fabButton: FabButtonProvider,
    private storage: Storage) {
    this.view = '1';
    
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.slides.lockSwipes(true);
    this.translate.get("COMMON").subscribe(value => {
      this.disagreeTitle=value.DISAGREE_TITLE;
      this.okBtn=value.OK;
    });
    this.translate.get("ALERT_MSG").subscribe(value => {
      this.networkError=value.NETWORK_ERROR;
      this.wrongPassword=value.WRONG_PASSWORD;
    });
  }
  fabClose(fab: FabContainer) {
    fab.close();
    console.log("Sharing in");
  }

  goToSlide(slide) {
    this.slides.lockSwipes(false);
    this.slides.slideTo(slide, 500);
    this.slides.lockSwipes(true);

  }


  disagree() {
    let confirm = this.alertCtrl.create({
      title: this.disagreeTitle,
      buttons: [
        {
          text: this.okBtn,
          handler: () => {
            this.slides.lockSwipes(false);
            this.slides.slideTo(0, 500);
            this.slides.lockSwipes(true);
            this.password = '';
          }
        }
      ]
    });
    confirm.present()
  }

  slideChanged() {
    this.currentIndex = this.slides.getActiveIndex();
    if (this.currentIndex == 2) {
      this.next = "active";

    }
    else if (this.currentIndex == 1) {
      cordova.plugins.Keyboard.close();
    }
    console.log('Current index is', this.next);
  }



  privacy(fab: FabContainer) {
    fab.close();
    //alert(fab);
    this.view = '2';
    this.contactProvider.getData();
  }

  navigateToProcess() {
    this.isenable = true;

    this.termsOfUseProvide.getVersion().then((data) => {
      this.storage.set('id', data);
      this.storage.set('password', this.password);
      this.userData.userPass = this.password;
      this.storage.get('id').then((val) => {
        this.userData.version = val;
        this.storage.set('versionDetails', this.userData);

        this.navCtrl.push(ProcessPage);
        console.log("val:" + val);
      });
    }).catch((err) => {
      console.log(err);
    })

  }

  nextTerms() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(2, 500);
    this.slides.lockSwipes(true);

    this.termsOfUseProvide.getTerms().then((data: string) => {
      this.termsOfUse = data;
    }).catch((err) => {
     // alert("error");
    })


  }

  navigateToNote() {
    if (this.password.length == 4) {
      if ((this.platform.is('core') || this.platform.is('mobileweb'))) {
        this.slides.lockSwipes(false);
        this.slides.slideTo(1, 500);
        this.slides.lockSwipes(true);
      } else {
        this.authServiceProvider.isValid(this.password).then((data: any) => {
          console.log(data);
          if (data) {
            if (data.status == "OK") {
              this.slides.lockSwipes(false);
              this.slides.slideTo(1, 500);
              this.slides.lockSwipes(true);
            }
            else {
              this.errorMsg = this.wrongPassword;
            }
          }
        }).catch((err) => {
          console.log(err.status);
          if(err.status == 0){
           this.errorMsg =this.networkError;
          }
        })

      }
    }
  }
}
