import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import {MyclassReviewPage} from '../myclass-review/myclass-review';
/*
  Generated class for the MyclassPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/myclass/myclass.html',
})
export class MyclassPage {

  constructor(private navCtrl: NavController, private Modal : ModalController) {

  }
  openReview(){
    let modal=this.Modal.create(MyclassReviewPage);
    modal.present();
  }
}
