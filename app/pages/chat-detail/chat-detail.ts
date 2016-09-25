import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {Class} from "../../providers/class/class";
import {Message} from '../../providers/message/message';

/*
  Generated class for the ChatDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/chat-detail/chat-detail.html',
  providers: [Class,Message]
})
export class ChatDetailPage {
  private tabBarElement: any;
  private message:string;
  constructor(private navCtrl: NavController, classService: Class, private params:NavParams,private messageService: Message) {
    this.tabBarElement = document.querySelector('#default_tabs_bar ion-tabbar');
    messageService.initRoom(params.get("courseId"),this.listenMessage);
  }
  goBack(){
    this.navCtrl.pop();
  }
  sendMessage(text){
    this.messageService.addMessage(text);
  }
  listenMessage(data){
    console.log(data.val());
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }
}
