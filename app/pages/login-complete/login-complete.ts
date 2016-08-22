import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {App} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';

/*
  Generated class for the LoginCompletePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login-complete/login-complete.html',
})
export class LoginCompletePage {

  constructor(private navCtrl: NavController, private app : App) {

  }
  registerComplete(){
    this.app.getRootNav().setRoot(TabsPage);
  }
}
