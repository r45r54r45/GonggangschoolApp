import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {SERVER_URL} from '../config';
/*
 Generated class for the Class provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class Class {

  constructor(private http:Http) {
  }

  getCourseList(start){
    let repos = this.http.get(SERVER_URL+`courses/list?start=${start}`);
    return repos;
  }

  test2(username){
    let repos = this.http.get(`https://api.github.com/users/${username}/repos`);
    return ;
  }
}


