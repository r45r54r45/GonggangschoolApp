import { Component } from '@angular/core';
import { NavController,NavParams, Storage, SqlStorage } from 'ionic-angular';
import { LoginCompletePage } from '../login-complete/login-complete';
import { ModalController } from 'ionic-angular';
import { LoginRegisterModalPage } from '../login-register-modal/login-register-modal';
import {Class} from '../../providers/class/class';
/*
  Generated class for the LoginRegisterPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login-register/login-register.html',
  providers: [Class]
})
export class LoginRegisterPage {
  private data:any={};
  constructor(private navCtrl: NavController, private Modal : ModalController,private params:NavParams,private classService: Class) {
    this.data=this.params.get("data");
    console.log("init data",this.data);
  }
  backButton(){
    this.navCtrl.pop();
  }
  registerComplete(){
    console.log("submit data",this.data);
    this.classService.registerUser(this.data).subscribe(data=>{
      if(data.json().result){
        let storage = new Storage(SqlStorage);
        storage.set('token', data.json().token);
        this.navCtrl.push(LoginCompletePage);
      }else{
        alert('회원가입 중 문제가 발생했습니다.');
      }
    });
  }
  openContract(){
    let modal=this.Modal.create(LoginRegisterModalPage);
    modal.present();
  }
}
