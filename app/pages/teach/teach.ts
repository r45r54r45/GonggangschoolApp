import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Slides} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import {ModalController, LoadingController} from 'ionic-angular';
import {TeachModalPage} from '../teach-modal/teach-modal';
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
  public basic: any = {};
  public profile: any = {info:{},time:[]};
  public rating: any = {};
  public comment: any;
  public isClassOpened: boolean = false;
  public teachList: any[] = [];
  public selectedId: number;
  public loading: any;
  public commentCount:number;
  @ViewChild('mySlider') slider: Slides;

  constructor(private navCtrl: NavController, private Modal: ModalController, private classService: Class, private loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
    classService.getTeachList().subscribe(data=> {
      this.teachList = data.json();
      if (this.teachList.length != 0) {
        this.selectClass(this.teachList[0].id, true);
      } else {
        this.loading.dismiss();
      }
    })
  }

  slideMove(moveTo) {
    this.slider.slideTo(moveTo, 500);
  }

  addClass() {
    let modal = this.Modal.create(TeachModalPage);
    modal.present();
  }

  selectClass(courseId, needLoadingEnd) {

    this.selectedId = courseId;
    this.isClassOpened = true;
    if (!needLoadingEnd) {
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loading.present();
    }
    this.classService.getBasic(courseId).subscribe(data => {
      console.log("basic",data.json());
      this.classService.getProfile(courseId).subscribe(data => {
        console.log("profile",data.json());
        this.classService.getRating(courseId).subscribe(data => {
          console.log("rating",data.json());
          this.classService.getComment(courseId, 0).subscribe(data => {
            console.log("comment",data.json());
            this.comment = data.json();
            this.commentCount=this.comment.length;
            this.comment.forEach((item, index)=> {
              item.star = makeStarRating(Math.floor(item.avg), "classRatingStarS");
            });
            console.log("finish");
            this.loading.dismiss();
          });
          this.rating = data.json();
          this.rating.avg_time = makeStarRating(this.rating.avg_time, "classRatingStar");
          this.rating.avg_curriculum = makeStarRating(this.rating.avg_curriculum, "classRatingStar");
          this.rating.avg_feedback = makeStarRating(this.rating.avg_feedback, "classRatingStar");
          this.rating.avg_prepare = makeStarRating(this.rating.avg_prepare, "classRatingStar");
        });
        this.profile = data.json();
        this.profile.time.forEach((item, index)=> {
          let start_loc = item.time.split('_');
          document.getElementById("teach_td_" + start_loc[1] + "_" + start_loc[0]).classList.add("selected");
        })
      });
      this.basic =data.json();
    });
  }
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
