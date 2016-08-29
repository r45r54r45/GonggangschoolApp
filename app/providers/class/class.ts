import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {SERVER_URL} from '../config';
/*
 Generated class for the Class provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class Class {
  public headers:Headers;
  constructor(private http:Http) {
    this.headers = new Headers({ 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNDcxMTEwODEyfQ.cVs-bqvTpr47Ts2pF5RDT5n8E6snUE7_nOF9OnRE8ww' });
  }

  // 유저부분
  loginUser(token){
    return this.http.get("https://graph.facebook.com/v2.7/me?fields=email%2Cname&access_token="+token);
  }
  verifyUser(email){
    return this.http.get("https://graph.facebook.com/v2.7/me?fields=email%2Cname&access_token="+email);
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


