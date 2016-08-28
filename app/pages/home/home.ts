import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomeDetailPage} from '../home-detail/home-detail';
import { Class } from '../../providers/class/class';
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

  constructor(private navCtrl: NavController, private classService: Class) {
    classService.test1().subscribe(data => {console.log(data);});
  }
  clickClass(){
    this.navCtrl.push(HomeDetailPage);
  }
}
