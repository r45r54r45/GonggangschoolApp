import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Slides} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import {Class} from '../../providers/class/class';
/*
 Generated class for the HomeDetailBuyPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/home-detail-buy/home-detail-buy.html',
  providers: [Class]
})
export class HomeDetailBuyPage {
  private buttonText:string;
  public prepare_data:any = {available_time: []};
  private school_id:string;
  private phone:string;

  constructor(private navCtrl:NavController, private classService:Class, public params:NavParams) {
    this.buttonText = "다음";
    this.classService.getRegisterPrepare(this.params.get("courseId")).subscribe(data=> {
      this.prepare_data = jsonify(data);
      this.school_id = this.prepare_data.school_id;
      this.phone = this.prepare_data.phone;
      console.log(this.prepare_data);
    });
  }

  @ViewChild('mySlider') slider:Slides;
  mySlideOptions = {
    initialSlide: 0,
    loop: false,
    onlyExternal: true
  };

  next() {
    let current = this.slider.getActiveIndex();
    this.slider.slideTo(++current, 500);
    if(current==3){
      let data={
        total_price:this.prepare_data.price*this.prepare_data.class_duration*4,
        email: this.prepare_data.email
      };
      this.classService.sendPayment(this.params.get("courseId"),data).subscribe(data=>{

      });
      this.navCtrl.pop();
    }
    switch (current) {
      case 1:
        if (this.phone != this.prepare_data.phone) {
          this.classService.editPhone(this.prepare_data.phone).subscribe(data=>{
          });
        }
        if (this.school_id != this.prepare_data.school_id) {
          this.classService.editSchoolId(this.prepare_data.school_id).subscribe(data=>{
          });
        }
        //TODO 수업 데이터 가져오기
        this.buttonText = "결제";
        break;
      case 2:
        this.buttonText = "확인";
        break;
    }
  }

  goBack() {
    this.navCtrl.pop();
  }
}
var jsonify = function (data) {
  return JSON.parse(data._body);
}
