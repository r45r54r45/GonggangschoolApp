import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {MypageEditPage} from '../mypage-edit/mypage-edit';
import {MypageSchedulePage} from '../mypage-schedule/mypage-schedule';
/*
  Generated class for the MypagePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/mypage/mypage.html',
})
export class MypagePage {

  constructor(private navCtrl: NavController) {

  }
  edit(type:string,data:string,editType:number){
    this.navCtrl.push(MypageEditPage,{type:type, data:data, editType:editType});
  }
  editSchedule(){
    this.navCtrl.push(MypageSchedulePage);
  }
}
