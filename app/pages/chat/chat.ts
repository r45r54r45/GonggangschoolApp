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
  private message:string;
  private user:string;
  public roomList:any=[];
  constructor(private navCtrl: NavController, private classService: Class, private messageService: Message) {

  }
  onPageDidEnter() {
    this.roomList=[];
    this.messageService.getRooms((data,courseId)=>{
      data.subscribe(data=>{
        let info=data.json();
        this.roomList.push({
          title: info.title,
          name: info.owner.name,
          profile: info.owner.profile,
          courseId: courseId
        });
      });
    });
  }
  goToChatDetail(courseId){
    this.navCtrl.push(ChatDetailPage,{courseId: courseId});
  }
}
