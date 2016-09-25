import {Injectable} from '@angular/core';
import {Class} from '../class/class';

@Injectable()
export class Message {
  private _todos$: any;
  private _db: any;
  private _room: any;
  private _messages: any;
  private pushOnRoom:any;

  constructor(private classService:Class) {
    // this._db = window['firebase'].database().ref('/');
    // this._messages = window['firebase'].database().ref('messages');
    //
    // this.pushOnRoom=this._room.push();
    // console.log("firebase init");
  }
  initRoom(courseId,callback){
    this.classService.getIdByToken().subscribe(data=>{
      let userId=data.json().id;
      this._room=window['firebase'].database().ref('messages/'+courseId+'/'+userId);
      this._room.on('child_added', callback, this);
    });
  }
  addMessage(text){
    this._room.push({'body':text,'created_at':new Date().toString()});
  }
}
