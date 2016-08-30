import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Slides} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import { ModalController,LoadingController } from 'ionic-angular';
import { TeachModalPage} from '../teach-modal/teach-modal';
import {Class} from '../../providers/class/class';
/*
  Generated class for the TeachPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/teach/teach.html',
  providers: [Class]
})
export class TeachPage {
  mySlideOptions = {
    initialSlide: 0,
    loop: false
  };
  public basic:any={owner:{}};
  public profile:any={Curriculum:[],availTime:[],owner:{Coach_info:{}}};
  public faq:any={};
  public rating:any={};
  public comment:any;
  public isClassOpened:boolean=false;
  public teachList:any[]=[];
  public selectedId:number;

  @ViewChild('mySlider') slider:Slides;
  constructor(private navCtrl: NavController, private Modal : ModalController, private classService:Class,private loadingCtrl: LoadingController) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    classService.getTeachList().subscribe(data=>{
      this.teachList=data.json();
      loading.dismiss();
    })
  }
  slideMove(moveTo) {
    this.slider.slideTo(moveTo, 500);
  }
  addClass(){
    let modal=this.Modal.create(TeachModalPage);
    modal.present();
  }
  selectClass(courseId){
    this.selectedId=courseId;
    this.isClassOpened=true;
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.classService.getBasic(courseId).subscribe(data => {
      this.classService.getProfile(courseId).subscribe(data =>{
        this.classService.getFaq(courseId).subscribe(data =>{ this.classService.getRating(courseId).subscribe(data =>{
          this.classService.getComment(courseId,0).subscribe(data =>{
            this.comment=jsonify(data);
            this.comment.forEach((item,index)=>{
              item.star=makeStarRating(Math.floor(item.avg_total),"classRatingStarS");
            });
            console.log("finish");
            loading.dismiss();
          });
          this.rating=jsonify(data);
          this.rating.avg_time=makeStarRating(this.rating.avg_time,"classRatingStar");
          this.rating.avg_curriculum=makeStarRating(this.rating.avg_curriculum,"classRatingStar");
          this.rating.avg_feedback=makeStarRating(this.rating.avg_feedback,"classRatingStar");
          this.rating.avg_prepare=makeStarRating(this.rating.avg_prepare,"classRatingStar");
        });
          this.faq=jsonify(data);
        });
        this.profile=jsonify(data);
        this.profile.availTime.forEach((item,index)=>{
          let start_loc=item.start_time.split('_');
          for(let i=parseInt(start_loc[0]); i<parseInt(start_loc[0])+item.duration; i++){
            document.getElementById("teach_td_"+i.toString()+"_"+start_loc[1]).classList.add("selected");
          }
        })
      });
      this.basic=jsonify(data);
    });




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
