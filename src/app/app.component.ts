import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { LoginPage } from '../pages/login/login';
import { TermsOfUseProvider } from "../providers/terms-of-use/terms-of-use";
import { Storage } from '@ionic/storage';
import { ProcessPage } from '../pages/process/process';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

 rootPage:any=LoginPage;;
  flag:boolean=false;
version:any='';
  constructor(platform: Platform,
               statusBar: StatusBar,
                splashScreen: SplashScreen,
                keyboard:Keyboard,
                public termsOfUseProvide: TermsOfUseProvider,
                private ga: GoogleAnalytics,
                private storage: Storage) {

                 
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      keyboard.onKeyboardShow().subscribe(() => {
        document.body.classList.add('keyboard-is-open');
      });
      keyboard.onKeyboardHide().subscribe(() => {
        document.body.classList.remove('keyboard-is-open');
      });

      if(platform.is('ios')){
        this.ga.startTrackerWithId("UA-81052483-47").then(() => {
          console.log('Google analytics is ready now');
          this.ga.debugMode();
          this.ga.setAllowIDFACollection(true);
        }).catch(e => console.log("Google Analytics Error",e));
      }

      if(platform.is("android")){
        this.ga.startTrackerWithId("UA-81052483-48").then(() => {
          console.log('Google analytics is ready now');
          this.ga.debugMode();
          this.ga.trackView("login","");
          this.ga.setAllowIDFACollection(true);
        }).catch(e => console.log("Google Analytics Error",e));
      }

      // storage.get('password').then((val) => {
      //   if(val ){
      //     this.rootPage=ProcessPage;
      //   }
      //   else{
      //     this.rootPage=LoginPage;
      //   }
      // });

    
    });
  }
}
