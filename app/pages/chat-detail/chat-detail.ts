import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Content} from 'ionic-angular';
import {Class} from "../../providers/class/class";
import {Message} from '../../providers/message/message';

/*
 Generated class for the ChatDetailPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/chat-detail/chat-detail.html',
  providers: [Class, Message]
})
export class ChatDetailPage {
  @ViewChild(Content) content: Content;
  private tabBarElement: any;
  private messageList: any;
  public myStyle: any;
  public yourStyle: any;
  public message:string;
  private uid:any;
  private roomTitle:string;

  constructor(private navCtrl: NavController, private classService: Class, private params: NavParams, private messageService: Message) {
    this.tabBarElement = document.querySelector('#default_tabs_bar ion-tabbar');
    messageService.initRoom(params.get("roomId"), this.listenMessage.bind(this));
    this.roomTitle=params.get("roomTitle");
    this.messageList = [];
    this.myStyle = {
      'background': 'rgba(102, 51, 153,.8)',
      'text-align': 'right',
      'margin-left': '50%',
      'color': 'white'
    };
    this.yourStyle = {
      'background': 'rgba(82,82,82,.1)',
      'color': '#525252'
    };
    this.classService.getIdByToken().subscribe(data=> {
      this.uid = data.json().uid;
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

  sendMessage(text) {
    this.message="";
    this.messageService.addMessage(text,this.uid);
  }

  listenMessage(data) {
    console.log(data.val());
    this.messageList.push(data.val());
    // this.content.scrollTo(0, this.content.getContentDimensions().contentHeight, 300);
    this.scrollToBottom.apply(this);
  }

  scrollToBottom(){
    this.content.scrollToBottom(300);
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }
}
