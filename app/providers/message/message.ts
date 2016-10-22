import {Injectable} from '@angular/core';
import {Class} from '../class/class';
import {Http, Headers, RequestOptions} from '@angular/http';
import {SERVER_URL} from '../config';

@Injectable()
export class Message {
  private _todos$: any;
  private _user:any;
  private _roomId: any;
  private _room: any;
  private _messages: any;
  private pushOnRoom:any;

  constructor(private classService:Class,private http: Http) {
  }
  initRoom(roomId,callback){
    //채팅방에 들어왔을때 채팅 목록을 띄워주는 부분
    this._roomId=roomId;
    this.classService.getIdByToken().subscribe(data=>{
      let userId=data.json().uid;
      this._room=window['firebase'].database().ref('message/'+roomId);
      this._room.on('child_added', callback, this);
    });
  }
  addMessage(text,myUid){
    let now=Date.now();
    window['firebase'].database().ref('message/'+this._roomId+"/"+now).set({'message':text,'person':myUid});
    //last message update
    window['firebase'].database().ref('room/'+this._roomId).update({'lastMessage':text,'lastTime':now});
  }
  initChat(text,courseId,courseTitle,yourId){
    // 처음 채팅을 시작할 때

    this.classService.getIdByToken().subscribe(data=> {
      let uid = data.json().uid;
      this.classService.getUserInfo(-1).subscribe(data=>{
        let myData=data.json();
        this.classService.getUserInfo(yourId).subscribe(data=> {
          let yourData = data.json();
          let roomData = {
            person1: {
              id: uid,
              name: myData.name,
              profile: myData.profile
            },
            person2: {
              id: yourData.id,
              name: yourData.name,
              profile: yourData.profile
            },
            lastMessage: text,
            lastTime: Date.now(),
            courseTitle: courseTitle,
            courseId: courseId
          };
          let roomId = window['firebase'].database().ref('room').push().key;
          let updates = {};
          updates['/room/' + roomId] = roomData;
          updates['/message/' + roomId + '/' + Date.now()] = {person: 'me', message: text};
          updates['/person/' + uid + '/' + roomId] = true;
          updates['/person/' + yourData.id + '/' + roomId] = true;
          window['firebase'].database().ref().update(updates);
        });
      });
    });
  }
  getRooms(callback){
    this.classService.getIdByToken().subscribe(data=> {
      let uid = data.json().uid;
      this._user = window['firebase'].database().ref('person/'+uid);
      this._user.on('child_added',function(data){
        let roomId=data.key;
        window['firebase'].database().ref('room/'+roomId).once('value').then(function(data){
          callback(data.val(),roomId)
        });
      }, this);
    });
  }
}
