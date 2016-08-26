import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the HomeDetailChatPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/home-detail-chat/home-detail-chat.html',
})
export class HomeDetailChatPage {

  constructor(private navCtrl: NavController) {

  }
  goBack(){
    this.navCtrl.pop();
  }
  submit(){
    console.log("submit");
  }
}
