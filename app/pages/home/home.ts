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
  public classList:any = [];
  private startCounter=0;

  constructor(private navCtrl:NavController, private classService:Class, private loadingController:LoadingController) {
    classService.getCourseList(this.startCounter).subscribe(data => {
      console.log(jsonify(data));
      this.classList = this.classList.concat(jsonify(data));
    });
  }

  clickClass() {
    this.navCtrl.push(HomeDetailPage);
  }
  doInfinite(infinite){
    this.startCounter+=10;
    this.classService.getCourseList(this.startCounter).subscribe(data => {
      if(jsonify(data).length==0){
        infinite.enable(false);
      }else{
        this.classList = this.classList.concat(jsonify(data));
        infinite.complete();
      }
    });
  }
}

var jsonify = function (data) {
  return JSON.parse(data._body);
}
