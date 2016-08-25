import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Slides} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import { ModalController } from 'ionic-angular';
import {HomeDetailChatPage} from "../home-detail-chat/home-detail-chat";
import {HomeDetailBuyPage} from "../home-detail-buy/home-detail-buy";
/*
 Generated class for the HomeDetailPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/home-detail/home-detail.html',
})
export class HomeDetailPage {
  mySlideOptions = {
    initialSlide: 0,
    loop: false
  };
  @ViewChild('mySlider') slider:Slides;
  private tabBarElement: any;
  constructor(private navCtrl:NavController, private Modal : ModalController) {
    this.tabBarElement = document.querySelector('#default_tabs_bar ion-tabbar');
  }
  onPageWillEnter()
  {
    this.tabBarElement.style.display = 'none';
  }
  onPageWillLeave()
  {
    this.tabBarElement.style.display = 'flex';
  }
  slideMove(moveTo) {
    this.slider.slideTo(moveTo, 500);
  }
  goBack(){
    this.navCtrl.pop();
  }
  ask(){
    let modal=this.Modal.create(HomeDetailChatPage);
    modal.present();
  }
  register(){
    let modal=this.Modal.create(HomeDetailBuyPage);
    modal.present();
  }
}
