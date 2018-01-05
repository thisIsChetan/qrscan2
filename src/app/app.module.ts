import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Camera } from '@ionic-native/camera';
import { HttpModule } from '@angular/http';

import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { TermsAndConditionsPage } from '../pages/terms-and-conditions/terms-and-conditions';
import { ComponentsModule } from '../components/components.module'
import { BarcodeProvider } from '../providers/barcode/barcode';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ContentProvider } from '../providers/content/content'; 


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TermsAndConditionsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      preloadModules: true,
      platforms: {
        ios: {
          statusbarPadding: false
        }
      }
    }),
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    TermsAndConditionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthServiceProvider,
    Camera,
    BarcodeProvider,
    BarcodeScanner,
    ContentProvider
  ]
})
export class AppModule { }
