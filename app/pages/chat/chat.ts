import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {InAppBrowser} from 'ionic-native';
import {Class} from "../../providers/class/class";
import {ChatDetailPage} from '../chat-detail/chat-detail';
/*
  Generated class for the ChatPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/chat/chat.html',
  providers: [Class]
})
export class ChatPage {
  private socket:any;
  private message:string;
  private user:string;
  constructor(private navCtrl: NavController, classService: Class) {
    this.socket = window['io'].connect('http://localhost:3001');
    this.socket.emit('userIdentify', { token:  classService.getUserToken()});
    this.socket.on("message",function(data){
      console.log(data);
    });
  }

  sendMessage(){
    this.socket.emit('message', { my: this.message });
  }
  goToChatDetail(chatRoomId){
    this.navCtrl.push(ChatDetailPage,{roomId: chatRoomId});
  }



  click2(){
    let bro=InAppBrowser.open('http://naver.com', "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
  }
  click(){
    let IMP=window['IMP'];
    IMP.init('iamport');
    IMP.request_pay({
      pg : 'inicis', // version 1.1.0부터 지원.
      /*
       'kakao':카카오페이,
       'inicis':이니시스, 'html5_inicis':이니시스(웹표준결제),
       'nice':나이스,
       'jtnet':jtnet,
       'uplus':LG유플러스
       */
      pay_method : 'card', // 'card' : 신용카드 | 'trans' : 실시간계좌이체 | 'vbank' : 가상계좌 | 'phone' : 휴대폰소액결제
      merchant_uid : 'merchant_' + new Date().getTime(),
      name : '주문명:결제테스트',
      amount : 14000,
      buyer_email : 'iamport@siot.do',
      buyer_name : '구매자이름',
      buyer_tel : '010-1234-5678',
      buyer_addr : '서울특별시 강남구 삼성동',
      buyer_postcode : '123-456',
      app_scheme : 'iamporttest' //in app browser결제에서만 사용
    }, function(rsp) {
      if ( rsp.success ) {
        var msg = '결제가 완료되었습니다.';
        msg += '고유ID : ' + rsp.imp_uid;
        msg += '상점 거래ID : ' + rsp.merchant_uid;
        msg += '결제 금액 : ' + rsp.paid_amount;
        msg += '카드 승인번호 : ' + rsp.apply_num;
      } else {
        var msg = '결제에 실패하였습니다.';
        msg += '에러내용 : ' + rsp.error_msg;
      }
    });
  }
}
