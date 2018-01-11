import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Camera } from '@ionic-native/camera';
import { HttpModule } from '@angular/http';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
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

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,'./assets/i18n/', '.json');
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
          useFactory: HttpLoaderFactory,
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
    HTTP,
    ContactProvider
  ]
})
export class AppModule { }
