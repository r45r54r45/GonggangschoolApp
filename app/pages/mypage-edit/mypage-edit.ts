import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

/*
  Generated class for the MypageEditPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/mypage-edit/mypage-edit.html',
})
export class MypageEditPage {
  private pageTitle:string;
  private targetData:string;
  private editType:number;
  constructor(private navCtrl: NavController,public params: NavParams) {
    this.pageTitle=this.params.get("type")+" 수정";
    this.editType=this.params.get("edit");
    this.targetData=this.params.get("data");
  }
  submit(){
    console.log(this.targetData);
    this.navCtrl.pop();
  }
}
