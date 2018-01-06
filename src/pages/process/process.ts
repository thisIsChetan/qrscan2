import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { BarcodeProvider } from '../../providers/barcode/barcode'
import { ContentProvider } from '../../providers/content/content'
import { SendDataProvider } from '../../providers/send-data/send-data'
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
  purchaseFrom:string;
  purchaseFromDetail: any = {};
  isImage: boolean = false;  
  view:string;
  packageType:string;
  verificationResult:string;
  postData:any = {}

  
  constructor( public navCtrl: NavController,
               public navParams: NavParams,
               private barcode: BarcodeProvider,
               private contentProvider: ContentProvider,
               private sendData: SendDataProvider) {
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
      this.postData = {
        "scannedCode": "0104711928261089211989187206841719010110A17080305",
        "scannedDate": "2018-01-04",
        "purchasedFrom": "Hospital",
        "purchasedName": "rep",
        "productDose": "5 mg",
        "scanStatus": "pass",
        "userConclusion": "ok"
      }
      this.postData.scannedDate = "2018-01-04";
      this.postData.purchasedFrom = this.purchaseFrom;
      this.postData.purchasedName = this.purchaseFromDetail[this.purchaseFrom];
      this.postData.productDose = this.packageType;
      this.postData.scanStatus = "pass";
      this.postData.userConclusion = this.verificationResult;
      this.sendData.send(this.postData).subscribe((data)=>{
        console.log(data);
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
  resText:string;
  showBarcode(){
    this.barcode.scan().then((data:any)=>{
      this.postData.scannedCode = data.text;
      this.postData.scannedDate = "2018-01-05";
      this.barcode.validate(data).subscribe((isValid)=>{
        if(isValid){
          this.showBarcodeRes("Code Validated!<br>Proceed to next step…");
        }
        else{
          this.showBarcodeRes(`Product authentication failed.<br> 
          Kindly contact numbers below to report the counterfeit product.<br>         
          Please contact support center during normal office hours: 0809-009-369<br> 
          Or Toll-free Number 0800-285-000`);
        }
      },(err)=>{
        this.resText = `System encountered some error while validating.<br> 
        Please contact support center during normal office hours: 0809-009-369<br> 
        Or Toll-free Number 0800-285-000`;
        this.view = "1.4";
      })      
    })
  }
  showBarcodeRes(msg: string){
    this.resText = msg;
    this.view = "1.3"; 
  }

  medImgURL: string;
  getImg(img){
    console.log("SDFGGFGDFGDFGDFSGDFSGDSFGDFSGDFGDFGDF", img)
    this.contentProvider.getImgURL(img).subscribe((url)=>{
      this.medImgURL = url;
      console.log("SDFGGFGDFGDFGDFSGDFSGDSFGDFSGDFGDFGDF", url)
      this.changeView('2.3')
    })
  }

  verificationCheck(value){
    if(value == 'ALL'){
      this.changeView('2.5') 
    }else{
      this.nextSlide();
    }
  }
}
