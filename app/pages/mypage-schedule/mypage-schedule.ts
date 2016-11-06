import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Class} from '../../providers/class/class';

/*
 Generated class for the MypageSchedulePage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/mypage-schedule/mypage-schedule.html',
  providers: [Class]
})
export class MypageSchedulePage {
  private avail_time_list: string[] = [];

  constructor(private navCtrl: NavController, private classService: Class, private params: NavParams) {

  }

  onPageDidEnter() {
    this.params.get("data").forEach((item, index)=> {
      document.getElementById("mypage_edit_td_" + item.time).classList.add("selected");
      this.avail_time_list.push(item.time);
    });
  }

  availTimeClick(row, col) {
    console.log(row, col);
    if (document.getElementById("mypage_edit_td_" + row + "_" + col).classList.contains("selected")) {
      document.getElementById("mypage_edit_td_" + row + "_" + col).classList.toggle("selected");
      this.avail_time_list.splice(this.avail_time_list.indexOf(row + "_" + col), 1);
    } else {
      document.getElementById("mypage_edit_td_" + row + "_" + col).classList.toggle("selected");
      this.avail_time_list.push(row + "_" + col);
    }
  }

  submit() {
    this.classService.editSchedule(this.avail_time_list).subscribe(data=> {
      console.log(data.json());
      this.navCtrl.pop();
    });
  }
}
