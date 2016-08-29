import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { LoginCompletePage } from '../login-complete/login-complete';
import { ModalController } from 'ionic-angular';
import { LoginRegisterModalPage } from '../login-register-modal/login-register-modal';
/*
  Generated class for the LoginRegisterPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login-register/login-register.html',
})
export class LoginRegisterPage {
  private data:any={};
  constructor(private navCtrl: NavController, private Modal : ModalController,private params:NavParams) {
    this.data=this.params.get("data");
  }
  backButton(){
    this.navCtrl.pop();
  }
  registerComplete(){
    this.navCtrl.push(LoginCompletePage);
  }
  openContract(){
    let modal=this.Modal.create(LoginRegisterModalPage);
    modal.present();
  }
}
