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
  public category: string = 'all';
  public categoryList: any = [];
  public timetable: string = 'all';
  public tabBarElement: any;

  constructor(private navCtrl: NavController, private classService: Class, private loadingCtrl: LoadingController) {
    this.tabBarElement = document.querySelector('#default_tabs_bar ion-tabbar');
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'flex';
  }

  onPageDidEnter() {
    this.startCounter = 0;
    this.classService.getCourseList(this.startCounter).subscribe(data => {
      console.info("getCourseList",data.json());
      this.classList = data.json().courses;
    });
    this.classService.getCategory(1).subscribe(data=> {
      this.categoryList = data.json().category;
    })
  }

  updateTimetable(value) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.category = 'all';
    if (value == "all") {
      this.startCounter = 0;
      this.classList = [];
      this.classService.getCourseList(this.startCounter).subscribe(data => {
        this.classList = data.json().courses;
        console.log(this.classList);
        loading.dismiss();
      });
    } else {
      this.startCounter = 0;
      this.classList = [];
      console.log("get match course list");
      this.classService.getMatchCourseList(this.startCounter).subscribe(data => {
        this.classList = data.json();
        console.log(this.classList);
        loading.dismiss();
      });
    }
  }

  updateCategory(event, value) {
    this.timetable = 'all';
    this.category = event;
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    if (event == 'all') {
      this.startCounter = 0;
      this.classList = [];
      this.classService.getCourseList(this.startCounter).subscribe(data => {
        this.classList = data.json().courses;
        console.log(this.classList);
        loading.dismiss();
      });
      return;
    }
    this.classService.getCategoryCourseList(this.startCounter, event).subscribe(data=> {
      this.classList = data.json().courses;
      loading.dismiss();
    });
  }

  clickClass(courseId) {
    this.navCtrl.push(HomeDetailPage, {courseId: courseId});
  }

  doInfinite(infinite) {
    console.log("start", this.startCounter);
    this.classService.getCourseList(this.startCounter + 5).subscribe(data => {
      console.log(data.json())
      if (!data.json().hasMore) {
        infinite.enable(false);
      } else {
        this.startCounter += 5;
      }
      infinite.complete();
      this.classList = this.classList.concat(data.json().courses);
    });
  }
}

