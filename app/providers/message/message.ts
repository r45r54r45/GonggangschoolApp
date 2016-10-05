import {Injectable} from '@angular/core';
import {Class} from '../class/class';
import {Http, Headers, RequestOptions} from '@angular/http';
import {SERVER_URL} from '../config';

@Injectable()
export class Message {
  private _todos$: any;
  private _user:any;
  private _db: any;
  private _room: any;
  private _messages: any;
  private pushOnRoom:any;

  constructor(private classService:Class,private http: Http) {
    // this._db = window['firebase'].database().ref('/');
    // this._messages = window['firebase'].database().ref('messages');
    //
    // this.pushOnRoom=this._room.push();
    // console.log("firebase init");
  }
  initRoom(courseId,callback){
    this.classService.getIdByToken().subscribe(data=>{
      let userId=data.json().uid;
      this._room=window['firebase'].database().ref('messages/'+courseId+'/'+userId);
      this._room.on('child_added', callback, this);
    });
  }
  addMessage(text){
    this._room.push({'body':text,'created_at':new Date().toString()});
  }
  initChat(text,courseId,courseTitle){
    this.classService.getIdByToken().subscribe(data=> {
      let uid = data.json().uid;
      window['firebase'].database().ref('users/'+uid).push({'courseId': courseId, 'courseTitle': courseTitle});
      console.log("firebase check");
      window['firebase'].database().ref('messages/'+courseId+'/'+uid).push({'body':text,'created_at':new Date().toString()});
    });
  }
  getRooms(callback){
    this.classService.getIdByToken().subscribe(data=> {
      let uid = data.json().uid;
      this._user = window['firebase'].database().ref('users/'+uid);
      this._user.on('child_added',function(data){
        let courseId=data.val().courseId;
        callback(this.http.get(SERVER_URL + `courses/watch/basic?courseId=${courseId}`),courseId);
      }, this);
      // this._messages.orderByKey().equalTo(uid.toString()).once('value').then(function(snapshot){
      //   console.log(snapshot.val());
      // })
    });
  }
}
