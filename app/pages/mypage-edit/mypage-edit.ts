import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Class} from "../../providers/class/class";

/*
 Generated class for the MypageEditPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/mypage-edit/mypage-edit.html',
  providers: [Class]
})
export class MypageEditPage {
  private pageTitle: string;
  private targetData: string;
  private editType: number;

  constructor(private navCtrl: NavController, public params: NavParams, private classService: Class) {
    this.pageTitle = this.params.get("type") + " 수정";
    this.editType = this.params.get("editType");
    this.targetData = this.params.get("data");
  }

  submit() {
    switch (this.editType) {
      case 0:
        this.classService.editName(this.targetData).subscribe(data=> {
          console.log(data.json());
        });
        break;
      case 1:
        this.classService.editEmail(this.targetData).subscribe(data=> {
          console.log(data.json());
        });
        break;
      case 2:
        this.classService.editPhone(this.targetData).subscribe(data=> {
          console.log(data.json());
        });
        break;
      case 3:
        this.classService.editSchool(this.targetData).subscribe(data=> {
          console.log(data.json());
        });
        break;
    }
    this.navCtrl.pop();
  }
}
