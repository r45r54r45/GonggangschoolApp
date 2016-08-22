import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the LoginRegisterModalPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login-register-modal/login-register-modal.html',
})
export class LoginRegisterModalPage {

  constructor(private navCtrl: NavController) {

  }
  backButton(){
    this.navCtrl.pop();
  }
}
