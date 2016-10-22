import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
// import {InAppBrowser} from 'ionic-native';
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
  constructor(private navCtrl: NavController, private classService: Class, private messageService: Message, private loadingCtrl: LoadingController) {


  }
  onPageDidEnter() {
    this.roomList=[];
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.messageService.getRooms((data,roomId)=>{
      this.roomList.push({
            roomId: roomId,
            title: data.courseTitle,
            name: data.person2.name,
            profile: data.person2.profile,
            courseId: data.courseId,
            lastTime: data.lastTime,
            lastMessage: data.lastMessage
          });
      loading.dismiss();
    });
  }
  goToChatDetail(roomId,roomTitle){
    this.navCtrl.push(ChatDetailPage,{roomId: roomId,roomTitle:roomTitle});
  }
}
