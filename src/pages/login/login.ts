import { Component, ViewChild } from '@angular/core';
import { Cordova } from '@ionic-native/core';
import { IonicPage, NavController, NavParams, Platform, Slides, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ContactProvider } from "../../providers/contact/contact";
import { TermsOfUseProvider } from "../../providers/terms-of-use/terms-of-use";
import { FabButtonProvider } from "../../providers/fab-button/fab-button"
import { Storage } from '@ionic/storage';
import { ProcessPage } from '../process/process';
import { FabContainer } from 'ionic-angular';

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
  isenable:boolean=false;
  userData = {
    userPass: '',
    version: ''
  }


  notice: string = "提醒您!<br>此應用程式僅供一由醫師處方犀利士之病患查詢參品使用<br>每筆查詢結果均會回報至台灣禮來公司<br>敬請謹慎操作 謝謝!";
  txt: string = "聯絡我們\n歡迎您寶貴的意見, 禮來公司關心您的健康。\n\n台灣禮來股份有限公司\n\n台北總公司：\n台北市復興北路365號11樓\n電話： (02)27152950 \n傳真： (02)27163314\n\n回報違反道德行為或疑慮 ：\n\n如果您認為禮來員工在執行業務過程中未能符合法規，或未遵循禮來公司核心價值，請主動撥打禮來全球Ethics and Compliance熱線00801-13-7956，或是透過 www.lillyethics.ethicspoint.com 做線上回報來告訴我們。請注意，如果您是從美國以外的地區回報，您所提交的報告的將會依當地分公司的流程進行處理。";
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public authServiceProvider: AuthServiceProvider,
    public contactProvider: ContactProvider,
    public termsOfUseProvide: TermsOfUseProvider,
    private platform: Platform,
    private fabButton: FabButtonProvider,
    public alertCtrl: AlertController,
    private storage: Storage) {

    this.view = '1';


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.slides.lockSwipes(true);
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
      title: '您是否確定離開此APP?',
      buttons: [
        {
          text: '是',
          handler: () => {
            this.storage.clear().then((val) => {
              this.platform.exitApp();
            })
          }
        },
        {
          text: '否',
          handler: () => {
            return true;
          }
        }

      ]
    });
    confirm.present()
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    if (currentIndex == 2) {
      this.next = "active";

    }
    else if (currentIndex == 1) {
      cordova.plugins.Keyboard.close();
    }
    console.log('Current index is', this.next);
  }



  privacy(fab: FabContainer) {
    fab.close();
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
      console.log("error");
    })



  }

  nextTerms() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(2, 500);
    this.slides.lockSwipes(true);

    this.termsOfUseProvide.getTerms().then((data: string) => {
      this.termsOfUse = data;
    }).catch((err) => {
      alert("error");
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
              this.errorMsg = "Wrong Password";
            }
          }
        }).catch((err) => {
          this.errorMsg = "Please check your network connection.";
        })

      }
    }
    else {
      this.errorMsg = "Length not match";
    }

  }
}
