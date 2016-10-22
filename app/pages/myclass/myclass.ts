import { Component } from '@angular/core';
import { NavController ,LoadingController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import {MyclassReviewPage} from '../myclass-review/myclass-review';
import {Class} from '../../providers/class/class';

/*
  Generated class for the MyclassPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/myclass/myclass.html',
  providers:[Class]
})
export class MyclassPage {
  private mineList:any=[];
  constructor(private navCtrl: NavController, private Modal : ModalController, private classService:Class,private loadingCtrl: LoadingController) {
  }
  onPageDidEnter(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.classService.getMineList().subscribe(data=>{
      this.mineList=data.json()[0].buyer;
      console.log(this.mineList);
      loading.dismiss();
    });
  }
  openReview(courseId){
    let modal=this.Modal.create(MyclassReviewPage);
    console.log(courseId);
    //TODO course id 를 모달에 정보 같이 보내기
    modal.present();
  }
}
