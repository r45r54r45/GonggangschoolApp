import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {SERVER_URL} from '../config';
import {LOGIN_DEV} from '../config';
import {Storage, SqlStorage} from 'ionic-angular';
import {Observable} from "rxjs";
/*
 Generated class for the Class provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class Class {
  public headers: Headers;
  public token: string;
  public loaded: boolean=false;

  constructor(private http: Http) {
    this.headers =  window['cc'].headers;
    this.token =  window['cc'].token;
  }

  getAuth() {

  };

  getUserToken() {
    return this.token;
  }

  getIdByToken() {
    return this.http.get(SERVER_URL + 'users/getId', {headers: this.headers});
  }

  // 유저부분
  loginUser(type, token) {
    if (type == "facebook") {
      return this.http.get("https://graph.facebook.com/v2.7/me?fields=email%2Cname%2Cpicture&access_token=" + token);
    } else {
      return this.http.get("https://www.googleapis.com/plus/v1/people/me?access_token=" + token);
    }
  }

  verifyUser(userdata) {
    return this.http.post(SERVER_URL + "users/verify", userdata);
  }

  registerUser(userdata) {
    return this.http.post(SERVER_URL + "users/register", userdata);
  }

  getUserInfo(uid) {
    if (uid == -1) {
      return this.http.get(SERVER_URL + "users/info", {headers: this.headers});
    } else {
      return this.http.get(SERVER_URL + "users/info?uid=" + uid, {headers: this.headers});
    }

  }


  getCourseList(start) {

      let courses = this.http.get(SERVER_URL + `courses/list?start=${start}`);
      return courses;
  }

  getCategoryCourseList(start, category1) {
    let courses = this.http.get(SERVER_URL + `courses/category/list?start=${start}&category=${category1}`);
    return courses;
  }

  getMatchCourseList(start) {
    let courses = this.http.get(SERVER_URL + `courses/match/list?start=${start}`, {headers: this.headers});
    return courses;
  }

  isBought(courseId) {
    return this.http.get(SERVER_URL + `users/bought?courseId=${courseId}`, {headers: this.headers});
  }

  getBasic(courseId) {
    return this.http.get(SERVER_URL + `courses/watch/basic?courseId=${courseId}`);
  }

  getProfile(courseId) {
    return this.http.get(SERVER_URL + `courses/watch/profile?courseId=${courseId}`);
  }

  getFaq(courseId) {
    return this.http.get(SERVER_URL + `courses/watch/faq?courseId=${courseId}`);
  }

  getRating(courseId) {
    return this.http.get(SERVER_URL + `courses/watch/review/rating?courseId=${courseId}`);
  }

  getComment(courseId, start) {
    return this.http.get(SERVER_URL + `courses/watch/review/comment?courseId=${courseId}&start=${start}`);
  }


  //결제부분
  getRegisterPrepare(courseId) {

    //
    return this.http.get(SERVER_URL + `courses/register/prepare?courseId=${courseId}`, {headers: this.headers});
  }

  sendPayment(courseId, data) {
    console.log(data);
    return this.http.post(SERVER_URL + `courses/register/payment?courseId=${courseId}`, {data: data}, {headers: this.headers});
  }


  //개인정보부분
  editSchoolId(data) {
    return this.http.patch(SERVER_URL + `users/info/schoolId`, {schoolId: data}, {headers: this.headers});
  }

  editPhone(data) {
    return this.http.patch(SERVER_URL + `users/info/phone`, {phone: data}, {headers: this.headers});
  }

  editName(data) {
    return this.http.patch(SERVER_URL + `users/info/name`, {name: data}, {headers: this.headers});
  }

  editSchool(data) {
    return this.http.patch(SERVER_URL + `users/info/school`, {school: data}, {headers: this.headers});
  }

  editStatus(data) {
    return this.http.post(SERVER_URL + `users/publish`, {on: data}, {headers: this.headers});
  }

  editEmail(data) {
    return this.http.patch(SERVER_URL + `users/info/email`, {email: data}, {headers: this.headers});
  }

  editSchedule(data) {
    return this.http.patch(SERVER_URL + `users/info/schedule`, {schedule: data}, {headers: this.headers});
  }

  // 강사페이지
  getCategory(type, category1 = -1) {
    if (category1 == -1) {
      return this.http.get(SERVER_URL + 'courses/category?type=' + type, {headers: this.headers});
    } else {
      return this.http.get(SERVER_URL + 'courses/category?type=' + type + '&category1=' + category1, {headers: this.headers});
    }
  }

  getTeachList() {
    return this.http.get(SERVER_URL + 'users/teach/list', {headers: this.headers});
  }

  sendNewCourse(course) {
    return this.http.post(SERVER_URL + 'courses/new', course, {headers: this.headers});
  }

  //내가 들은 강의
  getMineList() {
    return this.http.get(SERVER_URL + 'users/mine/list', {headers: this.headers});
  }

  sendRating(courseId, data) {
    return this.http.post(SERVER_URL + `users/mine/review?courseId=${courseId}`, data, {headers: this.headers});
  }
}


