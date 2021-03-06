import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { LoginPage } from '../pages/login/login';
import { TermsOfUseProvider } from "../providers/terms-of-use/terms-of-use";
import { Storage } from '@ionic/storage';
import { ProcessPage } from '../pages/process/process';
import { TranslateService } from '@ngx-translate/core';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any;
  flag: boolean = false;
  password = '';
  newVersion: any;
  alertTitle:string;
  yes:string;
  no:string;
  
  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    keyboard: Keyboard,
    public termsOfUseProvide: TermsOfUseProvider,
    private ga: GoogleAnalytics,
    private translate: TranslateService,
    public alertCtrl: AlertController,
    private storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      translate.get("COMMON").subscribe(value => {
        this.alertTitle=value.CONFORM_ALERT_MSG;
        this.yes=value.YES;
        this.no=value.NO;
      })

      platform.registerBackButtonAction(() => {
        let confirm = this.alertCtrl.create({
          title: this.alertTitle,
          buttons: [
            {
              text: this.yes,
              handler: () => {
                this.storage.clear().then((val) => {
                  platform.exitApp();
                })
              }
            },
            {
              text: this.no,
              handler: () => {
                return true;
              }
            }
    
          ]
        });
        confirm.present()
      });
      
      keyboard.onKeyboardShow().subscribe(() => {
        document.body.classList.add('keyboard-is-open');
      });
      keyboard.onKeyboardHide().subscribe(() => {
        document.body.classList.remove('keyboard-is-open');
      });

      if (platform.is('ios')) {
        this.ga.startTrackerWithId("UA-81052483-47").then(() => {
          console.log('Google analytics is ready now');
          this.ga.debugMode();
          this.ga.setAllowIDFACollection(true);
        }).catch(e => console.log("Google Analytics Error", e));
      }

      if (platform.is("android")) {
        this.ga.startTrackerWithId("UA-81052483-48").then(() => {
          console.log('Google analytics is ready now');
          this.ga.debugMode();
          this.ga.trackView("login", "");
          this.ga.setAllowIDFACollection(true);
        }).catch(e => console.log("Google Analytics Error", e));
      }

      this.storage.length().then((len) => {
        if(len == 0){
         this.rootPage = LoginPage;
        }
        else{
         this.storage.get('versionDetails').then((val) => {
           if (val.userPass) {
             this.termsOfUseProvide.getVersion().then((data) => {
               if (val.version == data) {
                 this.rootPage = ProcessPage;
               }
               else {
                 this.rootPage = LoginPage;
               }
             }).catch((err) => {
               this.rootPage = LoginPage;
             })
           }
           else {
             this.rootPage = LoginPage;
           }
         });
        }
       });

    });
  }
}
