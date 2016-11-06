import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Slides} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import {ModalController, NavParams,LoadingController} from 'ionic-angular';
import {HomeDetailChatPage} from "../home-detail-chat/home-detail-chat";
import {HomeDetailBuyPage} from "../home-detail-buy/home-detail-buy";
import {Class} from '../../providers/class/class';
import {ProfilePage} from "../profile/profile";
import {Message} from '../../providers/message/message';
import {ChatDetailPage} from '../chat-detail/chat-detail'
/*
 Generated class for the HomeDetailPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/home-detail/home-detail.html',
  providers: [Class,Message]
})
export class HomeDetailPage {
  mySlideOptions = {
    initialSlide: 0,
    loop: false
  };
  public basic: any = {};
  public profile: any = {info:{},time:[]};
  public faq: any = {};
  public rating: any = {};
  public comment: any;
  private ajaxCounter: number = 0;
  @ViewChild('mySlider') slider: Slides;
  private tabBarElement: any;
  private commentCount:any;
  private bought: any;

  constructor(private navCtrl: NavController,private loadingCtrl: LoadingController,private Modal: ModalController, private classService: Class, public params: NavParams, public message: Message) {
    this.tabBarElement = document.querySelector('#default_tabs_bar ion-tabbar');
    this.init();
  }

  isAjaxEnded(loading) {
    if (++this.ajaxCounter == 4) {
      loading.dismiss();
      this.ajaxCounter=0;
    }
  }

  init() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.classService.isBought(this.params.get('courseId')).subscribe(data => {
      this.bought=data.json();
      console.log(this.bought);
    });
    this.classService.getBasic(this.params.get('courseId')).subscribe(data => {
      this.basic = data.json();
      console.log("getBasic",this.basic);
      this.isAjaxEnded(loading);
    });
    this.classService.getProfile(this.params.get('courseId')).subscribe(data => {
      this.profile = data.json();
      console.log("getProfile",this.profile);
      this.profile.time.forEach((item, index)=> {
        let start_loc = item.time.split('_');
        document.getElementById("show_td_" +  start_loc[0] + "_" + start_loc[1]).classList.add("selected");
      })
      this.isAjaxEnded(loading);
    });
    this.classService.getRating(this.params.get('courseId')).subscribe(data => {
      this.rating = data.json();
      console.log("getRating", this.rating);
      this.rating.avg_time = makeStarRating(this.rating.avg_time, "classRatingStar");
      this.rating.avg_curriculum = makeStarRating(this.rating.avg_curriculum, "classRatingStar");
      this.rating.avg_feedback = makeStarRating(this.rating.avg_feedback, "classRatingStar");
      this.rating.avg_prepare = makeStarRating(this.rating.avg_prepare, "classRatingStar");
      this.isAjaxEnded(loading);
    });
    this.classService.getComment(this.params.get('courseId'), 0).subscribe(data => {
      this.comment = data.json();
      console.log("getComment",this.comment);
      this.comment.forEach((item, index)=> {
        item.star = makeStarRating(Math.floor(item.avg), "classRatingStarS");
      });
      this.commentCount=this.comment.length;
      this.isAjaxEnded(loading);
    });
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }


  slideMove(moveTo) {
    this.slider.slideTo(moveTo, 500);
  }

  goBack() {
    this.navCtrl.pop();
  }

  ask() {
    this.message.doesMessageOpened(this.params.get('courseId')).then(function(data){
      if(data['result']){
        //true
        //send to chat page
        this.navCtrl.push(ChatDetailPage,{roomId: data['roomId'],roomTitle:this.basic.title});
      }else{
        let modal = this.Modal.create(HomeDetailChatPage, {courseId: this.params.get('courseId'),courseTitle: this.basic.title, uid:this.basic.uid});
        modal.present();
      }
    }.bind(this));
  }

  register() {
    let modal = this.Modal.create(HomeDetailBuyPage, {courseId: this.params.get('courseId'),courseTitle: this.basic.title});
    modal.present();
  }
  profileClick(uid){
    this.navCtrl.push(ProfilePage);
  }
}
var jsonify = function (data) {
  return JSON.parse(data._body);
}
// classRatingStarS
var makeStarRating = function (number, className) {
  let output: string = "";
  for (let i = 0; i < number; i++) {
    output += `<img class="${className}" src="build/images/star.svg"/>`;
  }
  for (let i = 0; i < 5 - number; i++) {
    output += `<img class="${className}" src="build/images/starLine.svg"/>`;
  }
  return output;
}
