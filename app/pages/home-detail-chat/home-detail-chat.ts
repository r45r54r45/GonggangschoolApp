import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {Message} from '../../providers/message/message';
import {Class } from '../../providers/class/class';
/*
  Generated class for the HomeDetailChatPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/home-detail-chat/home-detail-chat.html',
  providers: [Message,Class]
})
export class HomeDetailChatPage {
  public message:string;
  constructor(private navCtrl: NavController, private messageService:Message, private params: NavParams) {
    // messageService.initRoom(params.get("courseId"),function(){});
  }
  goBack(){
    this.navCtrl.pop();
  }
  submit(text){
    this.messageService.initChat(text,this.params.get("courseId"),this.params.get("courseTitle"));
    this.navCtrl.pop();
  }
}
