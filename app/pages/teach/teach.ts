import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Slides} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import { ModalController } from 'ionic-angular';
import { TeachModalPage} from '../teach-modal/teach-modal';
/*
  Generated class for the TeachPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/teach/teach.html',
})
export class TeachPage {
  mySlideOptions = {
    initialSlide: 0,
    loop: false
  };
  @ViewChild('mySlider') slider:Slides;
  constructor(private navCtrl: NavController, private Modal : ModalController) {
  }
  slideMove(moveTo) {
    this.slider.slideTo(moveTo, 500);
  }
  addClass(){
    let modal=this.Modal.create(TeachModalPage);
    modal.present();
  }
}
