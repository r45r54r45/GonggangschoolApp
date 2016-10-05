import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HomeDetailPage} from '../home-detail/home-detail';
import {Class} from '../../providers/class/class';
import {LoadingController} from 'ionic-angular';

/*
 Generated class for the HomePage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [Class]
})
export class HomePage {
  public classList: any = [];
  private startCounter = 0;
  public category:string='all';
  public timetable:string='all';

  constructor(private navCtrl: NavController, private classService: Class, private loadingCtrl: LoadingController) {

  }
  onPageDidEnter(){
    this.startCounter = 0;

    this.classService.getCourseList(this.startCounter).subscribe(data => {
      this.classList = jsonify(data);
      console.log(this.classList);
      // loading.dismiss();
    });
  }
  updateTimetable(value){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    if(value=="all"){
      this.startCounter=0;
      this.classList=[];
      this.classService.getCourseList(this.startCounter).subscribe(data => {
        this.classList = data.json();
        console.log(this.classList);
        loading.dismiss();
      });
    }else{
      this.startCounter=0;
      this.classList=[];
      this.classService.getMatchCourseList(this.startCounter).subscribe(data => {
        this.classList = data.json();
        console.log(this.classList);
        loading.dismiss();
      });
    }
  }
  updateCategory(event,value){
    // event.preventDefault();
    // console.log(value);
    alert('현재 준비중인 기능입니다.');
  }
  clickClass(courseId) {
    this.navCtrl.push(HomeDetailPage, {courseId: courseId});
  }

  doInfinite(infinite) {
    console.log("start",this.startCounter);
    this.classService.getCourseList(this.startCounter+10).subscribe(data => {
      if (jsonify(data).length == 0) {
        infinite.enable(false);
      } else {
        this.startCounter += 10;
        this.classList = this.classList.concat(jsonify(data));
        infinite.complete();
      }
    });
  }
}

var jsonify = function (data) {
  return JSON.parse(data._body);
}
