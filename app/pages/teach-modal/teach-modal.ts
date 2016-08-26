import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Slides} from 'ionic-angular';
import {ViewChild} from '@angular/core';
/*
  Generated class for the TeachModalPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/teach-modal/teach-modal.html',
})
export class TeachModalPage {
  mySlideOptions = {
    initialSlide: 0,
    loop: false
  };
  @ViewChild('mySlider') slider:Slides;
  constructor(private navCtrl: NavController) {

  }
  slideMove(moveTo) {
    this.slider.slideTo(moveTo, 500);
  }
  backButton(){
    this.navCtrl.pop();
  }
}
