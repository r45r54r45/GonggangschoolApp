import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Slides} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import {Class} from '../../providers/class/class'
/*
 Generated class for the TeachModalPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/teach-modal/teach-modal.html',
  providers: [Class]
})
export class TeachModalPage {
  mySlideOptions = {
    initialSlide: 0,
    loop: false,
    onlyExternal: true
  };
  private bottomRightButton:string="다음";
  private prevButtonShow:boolean = false;
  private headerTitle:string[] = ['1:1 수업 종류를<br/>선택해주세요!', '1:1 수업 정보를<br/>작성해주세요!', '코치 정보를<br/>작성해주세요!'];
  private headerTitleIndex:number = 0;
  private class_area:string="-1";
  private class_category:string='-1';
  private class_tag:string="";
  private class_title:string="";
  private class_weekend:string="";
  private class_place:string="";
  private class_history:string="";
  private class_comment:string="";
  private class_phone:string="";
  private class_faq:string="";


  private class_curriculum_list:Object[];
  private class_duration:number = 1;
  private availTimeArray:string[] = [];
  private availTime:string = "";
  private selectedGroupId:number=0;


  private category1list:any=[];
  private category2list:any=[];
  @ViewChild('mySlider') slider:Slides;

  constructor(private navCtrl:NavController, private classService: Class) {
    this.class_curriculum_list = [];
    this.class_curriculum_list.push({description: ""});
    this.classService.getCategory(1).subscribe(data=>{
     this.category1list=data.json().category;
      //ㅇㅇㅇ
    });
  }
  cate1Selected(e){
    this.classService.getCategory(2,e).subscribe(data=>{
      this.category2list=data.json().category;
    });
  }
  slideMove(moveTo) {
    this.slider.slideTo(moveTo, 500);
  }

  backButton() {
    this.navCtrl.pop();
  }

  prev() {
    let current = this.slider.getActiveIndex();
    this.slideMove(--current);
    this.headerTitleIndex--;
    if (this.slider.getActiveIndex() == 0) {
      this.prevButtonShow = false;
    }
  }

  next() {
    let current = this.slider.getActiveIndex();
    switch(current){
      case 0:
        if(this.class_area=="-1"||this.class_category=='-1'||this.class_tag==""){
          alert('모든 정보를 채워주세요');
          return;
        }
        break;
      case 1:
        if(this.class_title==""||this.class_weekend==""||this.class_place==""||this.isCurriculumEmpty(this.class_curriculum_list)||this.availTimeArray.length==0){
          alert('모든 정보를 채워주세요');
          return;
        }
            break;
      case 2:
         if(this.class_history==""||this.class_comment==""||this.class_phone==""||this.class_faq==""){
           alert('모든 정보를 채워주세요');
           return;
         }
        break;
    }
    this.slideMove(++current);
    if(current==3){
      //정보 보내고
      //다음 페이지로 이동
      this.headerTitle[3]=this.class_title;
      this.headerTitleIndex++;
      this.prevButtonShow = false;
      this.bottomRightButton="확인";
    }else if(current==4) {
      this.submit();
      this.navCtrl.pop();
    }else{
      this.prevButtonShow = true;
      (this.headerTitleIndex < 2 ? this.headerTitleIndex++ : true);
    }
  }

  addCurriculum() {
    this.class_curriculum_list.push({description: ""});
    console.log(this.class_curriculum_list);
  }

  rmCurriculum() {
    this.class_curriculum_list.pop();
  }

  addClassDuration() {
    this.class_duration++;
    this.resetAvailTimeSchedule();
    this.availTimeArray = [];
  }

  minusClassDuration() {
    (this.class_duration > 1 ? this.class_duration-- : true);
    this.resetAvailTimeSchedule();
    this.availTimeArray = [];
  }

  availTimeClick(row, col) {
    console.log(row, col);
    if (document.getElementById("make_td_" + row + "_" + col).classList.contains("selected")) {
      let groupId=document.getElementById("make_td_" + row + "_" + col).classList.item(1);
      let groupList=[].slice.call(document.getElementsByClassName(groupId));
      groupList.forEach((item, index)=>{
        item.classList.remove("selected");
        item.classList.remove(groupId);
        let splitedArray=item.id.split('_');
        this.availTimeArray.splice(this.availTimeArray.indexOf(this.availTimeToString(splitedArray[1],splitedArray[2])),1);
      });
    }else if(this.isSelectedTimeOverlap(row,col)){
      alert('기존에 선택된 시간하고 겹칩니다.');
    }else if (row + this.class_duration - 1 <= 10) {
      this.selectedGroupId++;
      for (let i = row; i < row + this.class_duration; i++) {
        let classList = document.getElementById("make_td_" + i + "_" + col).classList;
        classList.add("selected");
        classList.add("selectedGroup"+this.selectedGroupId);
        this.availTimeArray.push(this.availTimeToString(i, col));
      }
    } else {
      alert('해당 시간은 범위를 벗어납니다.');
    }
  }

  submit() {

    this.availTime = this.availTimeArray.toString();

    let data={
        class_area:this.class_area,
        class_category:this.class_category,
        class_tag: this.class_tag,
        class_title:this.class_title,
        class_weekend:this.class_weekend,
        class_place:this.class_place,
        class_history:this.class_history,
        class_comment:this.class_comment,
        class_phone:this.class_phone,
        class_faq:this.class_faq,
        avail_time:this.availTime,
        class_curriculum_list:this.class_curriculum_list,
        class_duration:this.class_duration
    }
    console.log(data);
    this.classService.sendNewCourse(data).subscribe(datum=>{
      console.log("new course result: ", datum.json().result);
    });
  }
  private isCurriculumEmpty(curriculumArray){
    for(let i=0; i<curriculumArray.length; i++){
      if(curriculumArray[i].description==""){
        return true;
      }
    }
    return false;
  }
  private isSelectedTimeOverlap(row, col){
    for (let i = row; i < row + this.class_duration; i++) {
      let classList = document.getElementById("make_td_" + i + "_" + col).classList;
      if(classList.contains("selected")){
        return true;
      }
    }
    return false;
  }
  private resetAvailTimeSchedule() {
    let targetTdArray = [].slice.call(document.getElementsByClassName("selected"));
    targetTdArray.forEach((item, index)=> {
      item.classList.remove("selected");
    });
  }

  private availTimeToString(row, col) {
    return row + '_' + col;
  }
}
