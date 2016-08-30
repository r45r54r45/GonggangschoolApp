import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import {MypageEditPage} from '../mypage-edit/mypage-edit';
import {MypageSchedulePage} from '../mypage-schedule/mypage-schedule';
import {Class} from "../../providers/class/class";
/*
  Generated class for the MypagePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/mypage/mypage.html',
  providers:[Class]
})
export class MypagePage {
  private userData:any={};
  constructor(private navCtrl: NavController,private classService:Class,private loadingCtrl: LoadingController) {

  }
  onPageDidEnter(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.classService.getUserInfo().subscribe(data=>{
      this.userData=data.json();
      let list=document.getElementsByClassName("mypage_td");
      for(let i=0; i<list.length; i++){
        list[i].classList.remove("selected");
      }
      this.userData.avail_time.split(',').forEach((item, index)=>{
        document.getElementById("td_"+item).classList.add("selected");
      });
      loading.dismiss();
    });
  }
  edit(type:string,data:string,editType:number){
    this.navCtrl.push(MypageEditPage,{type:type, data:data, editType:editType});
  }
  editSchedule(){
    this.navCtrl.push(MypageSchedulePage,{data:this.userData.avail_time});
  }
  editStatus(status){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    if(status=="ON"){
      this.classService.editStatus("false").subscribe(data=>{
        console.log(data.json());
        loading.dismiss();
      });
    }else{
      this.classService.editStatus("true").subscribe(data=>{
        console.log(data.json());
        loading.dismiss();
      });
    }
  }
}
