import { Component} from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {RatingComponent} from './rating';
import {Class} from '../../providers/class/class';
/*
  Generated class for the MyclassReviewPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/myclass-review/myclass-review.html',
  providers: [Class],
  directives: [RatingComponent]
})
export class MyclassReviewPage {
  private rate_0: number=0;
  private rate_1: number=0;
  private rate_2: number=0;
  private rate_3: number=0;
  private rate_description:string;
  private ratings:number[]=[];
  constructor(private navCtrl: NavController, private params: NavParams, private classService:Class) {

  }
  hoveringOver(num,evt){
    this.ratings[num-1]=evt;
    console.log(this.ratings);
  }
  goBack(){
    this.navCtrl.pop();
  }
  submit(){
    if(this.rate_description==""||!this.ratings[0]||!this.ratings[1]||!this.ratings[2]||!this.ratings[3]){
      console.log(false);
    }else{
      console.log(this.ratings);
      console.log(this.rate_description);
      this.classService.sendRating(1,{
        rating: this.ratings,
        description: this.rate_description
      }).subscribe(data=>{
        this.navCtrl.pop();
      });
    }
  }
}
