import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { BarcodeProvider } from '../../providers/barcode/barcode'
import { ContentProvider } from '../../providers/content/content'
import { SendDataProvider } from '../../providers/send-data/send-data'
import {TranslateService} from '@ngx-translate/core';
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
  currentIndex:number = 0;
  purchaseFrom:string='';
  purchaseFromDetail: any = {};
  isImage: boolean = false;  
  view:string;
  isData={
    'Exists': '' ,
    'Frequency_exceeded': ''
  }
  
 // Exists:boolean;
  packageType:string='';
  verificationResult:string='';
  postData:any = {}

  today = new Date();
  dd = this.today.getDate();
  mm =this.today.getMonth()+1; 
  yyyy = this.today.getFullYear();
  date = this.yyyy+'-'+this.mm+'-'+this.dd;
  
  constructor( public navCtrl: NavController,
               public navParams: NavParams,
               private barcode: BarcodeProvider,
               private contentProvider: ContentProvider,
               private sendData: SendDataProvider,
              private translate:TranslateService) {
                translate.setDefaultLang('en');
                
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProcessPage');
    this.slides.lockSwipes(true);
  }

  goToSlide(slide) {
    this.slides.lockSwipes(false);
    this.slides.slideTo(slide, 500);
    this.slides.lockSwipes(true);
  }
  resetValidation(){
    this.purchaseFrom = "";
    this.packageType = "";
    this.verificationResult = "";
    this.purchaseFromDetail = {};
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }
  nextSlide(){
    
    this.slides.lockSwipes(false);
    this.slides.slideNext(500, true);
    this.slides.lockSwipes(true);
    let _currentIndex = this.slides.getActiveIndex();
    if(_currentIndex == 1){
      this.view = '1.1';
      //this.barcode.showAlert();
       this.showBarcode();
    }else if(_currentIndex == 2){
      this.view = "2.1";
    }else if(_currentIndex == 3){
      this.view = '3.1';
      
      this.postData.scannedDate = this.date;
      this.postData.purchasedFrom = this.purchaseFrom;
      this.postData.purchasedName = this.purchaseFromDetail[this.purchaseFrom];
      this.postData.productDose = this.packageType;
      this.postData.scanStatus = "pass";
      this.postData.userConclusion = this.verificationResult;
      this.sendData.send(this.postData).then((data)=>{
        console.log(data);
        this.view = '3.s'
      }).catch((data)=>{
        console.log(data);
        this.view = '3.e'
      })
    }
    
  }
  slideChanged() {
    this.currentIndex = this.slides.getActiveIndex();
  }

  changeView(view){
    this.view = view;
   
  }

  buttonClick(){
    alert("dsg");
  }
  //Slide 1

  showBarcode(){
    this.barcode.scan().then((data:any)=>{
      this.postData.scannedCode = data.text;
      console.log("Data is here:"+data.text);
      // this.postData.scannedDate = "2018-01-05";
      this.barcode.validate(data).then((isValid)=>{
          console.log("valid:"+isValid);
        if(isValid){
          this.view = "1.s";
        }
        else{
          this.view = "1.e";
        }
      }).catch((err)=>{
        this.view = "1.ee";
      })      
    })
  }

  medImgURL: string;
  getImg(img){
    console.log("SDFGGFGDFGDFGDFSGDFSGDSFGDFSGDFGDFGDF", img)
    this.contentProvider.getImgURL(img).then((url: string)=>{
      this.medImgURL = url;
      console.log("SDFGGFGDFGDFGDFSGDFSGDSFGDFSGDFGDFGDF", url)
      this.changeView('2.3')
    }).catch((err)=>{
      console.log("Err",err);
    })
  }

  verificationCheck(value){
    if(value == 'ALL'){
      this.changeView('2.5') 
    }
    else if(value == 'SOME' || value == 'NOT_SURE'){
      this.changeView('2.6') 
    }
    else{
      this.nextSlide();
    }
  }
  
 

  focusit(val){
    console.log(val);
    this.purchaseFrom = val;
  }
}
