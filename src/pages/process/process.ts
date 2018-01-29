import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { BarcodeProvider } from '../../providers/barcode/barcode'
import { ContentProvider } from '../../providers/content/content'
import { SendDataProvider } from '../../providers/send-data/send-data'
import { FabContainer } from 'ionic-angular';
import { FabButtonProvider } from "../../providers/fab-button/fab-button"
import { AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the ProcessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-process',
  templateUrl: 'process.html',
})
export class ProcessPage {
  @ViewChild(Slides) slides: Slides;
  currentIndex: number = 0;
  purchaseFrom: string = '';
  purchaseFromDetail: any = {};
  isImage: boolean = false;
  zoomImageMsg:string;
  view: string;

  // Exists:boolean;
  packageType: string = '';
  verificationResult: string = '';
  postData: any = {}

  today = new Date();
  dd = this.today.getDate();
  mm = this.today.getMonth() + 1;
  yyyy = this.today.getFullYear();
  date = this.yyyy + '-' + this.mm + '-' + this.dd;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private barcode: BarcodeProvider,
    private alertCtrl: AlertController,
    private contentProvider: ContentProvider,
    private fabButton: FabButtonProvider,
    private translate: TranslateService,
    private sendData: SendDataProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProcessPage');
    this.translate.get("COMMON").subscribe(value => {
      this.zoomImageMsg=value.ZOOM_IMAGE;
    });
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
  resetValidation() {
    this.purchaseFrom = "";
    this.packageType = "";
    this.verificationResult = "";
    this.purchaseFromDetail = [];
    this.purchaseFromDetail = {
      HOSPITAL: '',
      PHARMACY: '',
      OTHER: ''
    };
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }
  nextSlide() {
    this.slides.lockSwipes(false);
    this.slides.slideNext(500, true);
    this.slides.lockSwipes(true);
    let _currentIndex = this.slides.getActiveIndex();
    if (_currentIndex == 1) {
      this.view = '1.c';
    } else if (_currentIndex == 2) {
      this.view = "2.1";
    } else if (_currentIndex == 3) {
      this.view = '3.1';
      this.postData.scannedDate = this.date;
      this.postData.purchasedFrom = this.purchaseFrom;
      console.log(this.purchaseFromDetail[this.purchaseFrom]);
      this.postData.purchasedName = this.purchaseFromDetail[this.purchaseFrom];
      this.postData.productDose = this.packageType;
      this.postData.scanStatus = "pass";
      this.postData.userConclusion = this.verificationResult;
      this.sendData.send(this.postData).then((data) => {
        console.log(data);
        this.view = '3.s'
      }).catch((data) => {
        console.log(data);
        this.view = '3.e'
      })
    }

  }

  slideChanged() {
    this.currentIndex = this.slides.getActiveIndex();
  }

  changeView(view) {
    console.log(view);
    this.view = view;
  }

  //Slide 1

  showBarcode() {
 
    this.barcode.scan().then((data: any) => {
      this.view = '1.1';
      if(data.text == ""){
        this.slides.lockSwipes(false);
        this.slides.slideTo(0,0);
        this.slides.lockSwipes(true);
        return;
      }
      else{
        this.view = '1.1';
      this.postData.scannedCode = data.text;
      this.barcode.validate(data).then((view: string) => {
          this.view = view;
      }).catch((err) => {
        this.view = '1.ee';
      })
    }
    }).catch((err)=> {
      this.changeView('1.p');
    })
  
  }

  medImgURL: string;
  getImg(img) {
    console.log("SDFGGFGDFGDFGDFSGDFSGDSFGDFSGDFGDFGDF", img)
    this.contentProvider.getImgURL(img).then((url: string) => {
      this.medImgURL = url;
      console.log("SDFGGFGDFGDFGDFSGDFSGDSFGDFSGDFGDFGDF", url)
      this.changeView('2.3')
      let alert = this.alertCtrl.create({
        message:  this.zoomImageMsg,
        buttons: ['OK']
      });
      alert.present();

    }).catch((err) => {
      // alert("Please check your network connection");
    })
  }

  verificationCheck(value) {
    if (value == 'ALL') {
      this.changeView('2.5')
    }
    else if (value == 'SOME' || value == 'NOT_SURE') {
      this.changeView('2.6')
    }
    else {
      this.nextSlide();
    }
  }
  focusit(val) {
    console.log(val);
    this.purchaseFrom = val;
    if (val == 'HOSPITAL') {
      this.purchaseFromDetail = {
        PHARMACY: '',
        OTHER: ''
      }
    }
    else if (val == 'PHARMACY') {
      this.purchaseFromDetail = {
        HOSPITAL: '',
        OTHER: ''
      }
    }
    else if (val == 'OTHER') {
      this.purchaseFromDetail = {
        HOSPITAL: '',
        PHARMACY: ''
      }
    }
    else {
      this.purchaseFromDetail = {
        HOSPITAL: '',
        PHARMACY: '',
        OTHER: ''
      };
    }
  }
}
