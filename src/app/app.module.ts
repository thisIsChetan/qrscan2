import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Camera } from '@ionic-native/camera';
import { HttpModule } from '@angular/http';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

import {TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { TermsAndConditionsPage } from '../pages/terms-and-conditions/terms-and-conditions';
import { ComponentsModule } from '../components/components.module'
import { BarcodeProvider } from '../providers/barcode/barcode';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ContentProvider } from '../providers/content/content';
import { SendDataProvider } from '../providers/send-data/send-data'; 
import { HTTP } from '@ionic-native/http';
import { ContactProvider } from '../providers/contact/contact';
import { TermsOfUseProvider } from '../providers/terms-of-use/terms-of-use';
import { FabButtonProvider } from '../providers/fab-button/fab-button';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TermsAndConditionsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
      }
  }),
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
    ContentProvider,
    SendDataProvider,
    Keyboard,
    GoogleAnalytics,
    HTTP,
    ContactProvider,
    TermsOfUseProvider,
    FabButtonProvider
  ]
})
export class AppModule {
  constructor(translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
}
 }
