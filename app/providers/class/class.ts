import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

/*
 Generated class for the Class provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class Class {

  constructor(private http:Http) {
  }

  test1(){
    return Observable.create(observer => {
      observer.next({result:true});
      observer.complete();
    });
  }

  test2(username){
    let repos = this.http.get(`https://api.github.com/users/${username}/repos`);
    return repos;
  }
}

