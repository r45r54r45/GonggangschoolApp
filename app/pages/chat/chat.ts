import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {InAppBrowser} from 'ionic-native';
import {Class} from "../../providers/class/class";
import {ChatDetailPage} from '../chat-detail/chat-detail';
import {Message} from '../../providers/message/message';
/*
  Generated class for the ChatPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/chat/chat.html',
  providers: [Class,Message]
})
export class ChatPage {
  private socket:any;
  private message:string;
  private user:string;
  constructor(private navCtrl: NavController, classService: Class, messageService: Message) {

  }
  goToChatDetail(courseId){
    this.navCtrl.push(ChatDetailPage,{courseId: courseId});
  }

}
