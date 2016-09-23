import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {Class} from "../../providers/class/class";

/*
  Generated class for the ChatDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/chat-detail/chat-detail.html',
  providers: [Class]
})
export class ChatDetailPage {
  private tabBarElement: any;
  private message:string;
  private socket:any;
  constructor(private navCtrl: NavController, classService: Class, private params:NavParams) {
    this.tabBarElement = document.querySelector('#default_tabs_bar ion-tabbar');
    this.socket = window['io'].connect('http://localhost:3001');
    var token=classService.getUserToken();
    console.log(token);
    this.socket.emit('userIdentify', { token: token });
    console.log(this.params.get('roomId'));
    this.socket.on("message",function(data){
      if(data.roomId==this.params.get('roomId')){
        console.log(data);
      }
    });
  }
  sendMessage(){
    this.socket.emit('message', { message: this.message,room: this.params.get('roomId') });
  }


  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.socket.disconnect();
    this.tabBarElement.style.display = 'flex';
  }
}
