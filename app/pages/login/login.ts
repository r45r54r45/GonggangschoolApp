import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginRegisterPage} from '../login-register/login-register';
/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {

  constructor(private navCtrl: NavController) {

  }
  loginComplete(){
    this.navCtrl.push(LoginRegisterPage);
  }
}
