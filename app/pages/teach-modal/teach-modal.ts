import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Slides} from 'ionic-angular';
import {ViewChild} from '@angular/core';
/*
  Generated class for the TeachModalPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/teach-modal/teach-modal.html',
})
export class TeachModalPage {
  mySlideOptions = {
    initialSlide: 0,
    loop: false,
    onlyExternal: true
  };
  private prevButtonShow: boolean=false;
  private headerTitle: string[]=['수업 종류를<br/>선택해주세요','수업 정보를<br/>작성해주세요','코치 정보를<br/>작성해주세요'];
  private headerTitleIndex:number=0;
  private curriculum_list:Object[];
  private class_duration:number=1;
  private availTimeArray:string[]=[];
  private availTime:string="";

  @ViewChild('mySlider') slider:Slides;
  constructor(private navCtrl: NavController) {
    this.curriculum_list=[];
    this.curriculum_list.push({description:""});
  }
  slideMove(moveTo) {
    this.slider.slideTo(moveTo, 500);
  }
  backButton(){
    this.navCtrl.pop();
  }
  prev(){
    let current=this.slider.getActiveIndex();
    this.slideMove(--current);
    this.headerTitleIndex--;
    if(this.slider.getActiveIndex()==0){
      this.prevButtonShow=false;
    }
  }
  next(){
    let current=this.slider.getActiveIndex();
    this.slideMove(++current);
    this.prevButtonShow=true;
    (this.headerTitleIndex<2?this.headerTitleIndex++:true);
  }
  addCurriculum(){
    this.curriculum_list.push({description:""});
    console.log(this.curriculum_list);
  }
  rmCurriculum(){
    this.curriculum_list.pop();
  }
  addClassDuration(){
    this.class_duration++;
    this.resetAvailTimeSchedule();
    this.availTimeArray=[];
  }
  minusClassDuration(){
    (this.class_duration>1?this.class_duration--:true);
    this.resetAvailTimeSchedule();
    this.availTimeArray=[];
  }
  availTimeClick(row,col){
    console.log(row, col);
    if(row+this.class_duration-1<=10){
      for(let i=row; i<row+this.class_duration; i++){
        document.getElementById("td_"+i+"_"+col).classList.add("selected");
        this.availTimeArray.push(this.availTimeToString(i,col));
      }
    }else{
      alert('해당 시간은 범위를 벗어납니다.');
    }
  }

  submit(){

    this.availTime=this.availTimeArray.toString();
  }
  private resetAvailTimeSchedule(){
    let targetTdArray = [].slice.call(document.getElementsByClassName("selected"));
    targetTdArray.forEach((item, index)=>{
      item.classList.remove("selected");
    });
  }
  private availTimeToString(row,col){
    return '('+row+'_'+col+')';
  }
}
