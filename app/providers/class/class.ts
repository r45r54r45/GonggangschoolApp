import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {SERVER_URL} from '../config';
import {Storage, SqlStorage} from 'ionic-angular';
/*
 Generated class for the Class provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class Class {
  public headers:Headers;
  constructor(private http:Http) {
    let storage = new Storage(SqlStorage);
    storage.get('token').then((token) => {
      this.headers = new Headers({ 'Authorization': token });
    });
  }
  getAuth(){

  };


  // 유저부분
  loginUser(type,token){
    if(type=="facebook"){
      return this.http.get("https://graph.facebook.com/v2.7/me?fields=email%2Cname&access_token="+token);
    }else{
      return this.http.get("https://www.googleapis.com/plus/v1/people/me?access_token="+token);
    }
  }
  verifyUser(userdata){
    return this.http.post(SERVER_URL+"users/verify",userdata);
  }



  getCourseList(start){
    let courses = this.http.get(SERVER_URL+`courses/list?start=${start}`);
    return courses;
  }
  getBasic(courseId){
    return this.http.get(SERVER_URL+`courses/watch/basic?courseId=${courseId}`);
  }
  getProfile(courseId){
    return this.http.get(SERVER_URL+`courses/watch/profile?courseId=${courseId}`);
  }
  getFaq(courseId){
  return this.http.get(SERVER_URL+`courses/watch/faq?courseId=${courseId}`);
  }
  getRating(courseId){
    return this.http.get(SERVER_URL+`courses/watch/review/rating?courseId=${courseId}`);
  }
  getComment(courseId,start){
    return this.http.get(SERVER_URL+`courses/watch/review/comment?courseId=${courseId}&start=${start}`);
  }


  //결제부분
  getRegisterPrepare(courseId){

    //
    return this.http.get(SERVER_URL+`courses/register/prepare?courseId=${courseId}`,{ headers: this.headers });
  }

  //개인정보부분
  editSchoolId(data){
    return this.http.patch(SERVER_URL+`users/info/schoolId`,{schoolId:data}, { headers: this.headers});
  }
  editPhone(data){
    return this.http.patch(SERVER_URL+`users/info/phone`,{phone:data},{ headers: this.headers});
  }
}


