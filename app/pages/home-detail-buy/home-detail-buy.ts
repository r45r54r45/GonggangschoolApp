import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Slides} from 'ionic-angular';
import {ViewChild} from '@angular/core';
/*
  Generated class for the HomeDetailBuyPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/home-detail-buy/home-detail-buy.html',
})
export class HomeDetailBuyPage {
  private buttonText: string;
  constructor(private navCtrl: NavController) {
    this.buttonText="다음";
  }
  @ViewChild('mySlider') slider:Slides;
  mySlideOptions = {
    initialSlide: 0,
    loop: false,
    onlyExternal: true
  };

  next(){
    let current=this.slider.getActiveIndex();
    this.slider.slideTo(++current, 500);
    switch(current){
      case 1:
            this.buttonText="결제";
            break;
      case 2:
            this.buttonText="확인";
            break;
    }
  }
  goBack(){
    this.navCtrl.pop();
  }
}
