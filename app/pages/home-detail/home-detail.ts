import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Slides} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import { ModalController,NavParams } from 'ionic-angular';
import {HomeDetailChatPage} from "../home-detail-chat/home-detail-chat";
import {HomeDetailBuyPage} from "../home-detail-buy/home-detail-buy";
import {Class} from '../../providers/class/class';
/*
 Generated class for the HomeDetailPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/home-detail/home-detail.html',
  providers: [Class]
})
export class HomeDetailPage {
  mySlideOptions = {
    initialSlide: 0,
    loop: false
  };
  public basic:any={owner:{}};
  public profile:any={Curriculum:[],availTime:[],owner:{Coach_info:{}}};
  public faq:any={};
  public rating:any={};
  public comment:any;

  @ViewChild('mySlider') slider:Slides;
  private tabBarElement: any;
  constructor(private navCtrl:NavController, private Modal : ModalController, private classService:Class,public params: NavParams) {
    this.tabBarElement = document.querySelector('#default_tabs_bar ion-tabbar');
  }
  onPageDidEnter(){
    this.classService.getBasic(this.params.get('courseId')).subscribe(data => {
      this.basic=jsonify(data);
    });
    this.classService.getProfile(this.params.get('courseId')).subscribe(data =>{
      this.profile=jsonify(data);
      this.profile.availTime.forEach((item,index)=>{
        let start_loc=item.start_time.split('_');
        for(let i=parseInt(start_loc[0]); i<parseInt(start_loc[0])+item.duration; i++){
          document.getElementById("td_"+i.toString()+"_"+start_loc[1]).classList.add("selected");
        }
      })
    });
    this.classService.getFaq(this.params.get('courseId')).subscribe(data =>{
      this.faq=jsonify(data);
    });
    this.classService.getRating(this.params.get('courseId')).subscribe(data =>{
      this.rating=jsonify(data);
      this.rating.avg_time=makeStarRating(this.rating.avg_time,"classRatingStar");
      this.rating.avg_curriculum=makeStarRating(this.rating.avg_curriculum,"classRatingStar");
      this.rating.avg_feedback=makeStarRating(this.rating.avg_feedback,"classRatingStar");
      this.rating.avg_prepare=makeStarRating(this.rating.avg_prepare,"classRatingStar");
    });
    this.classService.getComment(this.params.get('courseId'),0).subscribe(data =>{
      this.comment=jsonify(data);
      this.comment.forEach((item,index)=>{
        item.star=makeStarRating(Math.floor(item.avg_total),"classRatingStarS");
      });
    });
  }

  onPageWillEnter()
  {
    this.tabBarElement.style.display = 'none';
  }
  onPageWillLeave()
  {
    this.tabBarElement.style.display = 'flex';
  }
  slideMove(moveTo) {
    this.slider.slideTo(moveTo, 500);
  }
  goBack(){
    this.navCtrl.pop();
  }
  ask(){
    let modal=this.Modal.create(HomeDetailChatPage);
    modal.present();
  }
  register(){
    let modal=this.Modal.create(HomeDetailBuyPage,{courseId:this.params.get('courseId')});
    modal.present();
  }
}
var jsonify = function (data) {
  return JSON.parse(data._body);
}
// classRatingStarS
var makeStarRating=function(number, className){
  let output:string="";
  for(let i=0; i<number; i++){
    output+=`<img class="${className}" src="build/images/star.svg"/>`;
  }
  for(let i=0; i<5-number; i++){
    output+=`<img class="${className}" src="build/images/starLine.svg"/>`;
  }
  return output;
}
