import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the ChatDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/chat-detail/chat-detail.html',
})
export class ChatDetailPage {
  private tabBarElement: any;
  constructor(private navCtrl: NavController) {
    this.tabBarElement = document.querySelector('#default_tabs_bar ion-tabbar');
  }
  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }
}
