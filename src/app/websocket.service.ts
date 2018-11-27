import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {QueueingSubject} from 'queueing-subject'
import {Observable} from 'rxjs/Observable'
import {WebSocketService} from 'angular2-websocket-service'
import 'rxjs/add/operator/map';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/catch';
import {Config} from "./Config";
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class WebsocketService {
  private inputStream: QueueingSubject<any>;
  public outputStream: Observable<any>;
  // public url = 'apis.coursefrenzy.com/';
  // public url = '192.168.29.109:8000';
  public url = '192.168.29.254:8000';
  private authentication: string | any;
  private apiUrl: string | any;
  // public url = Config.api;
  // objGlobalvariables = new Globalvariables();;
  constructor(private http: Http, private socketFactory: WebSocketService, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.authentication = localStorage.getItem('ApiUrlLocal');
      this.apiUrl = localStorage.getItem('ApiUrlLocal');
    }
  }

  public javascriptSocket(message, username) {
    let socket = new WebSocket("ws://"+ this.url +"/chat?username=" + username);
    socket.onmessage = function (e) {
      // console.log(e.data);
      // this.messages.push(e.data);
      // localStorage.setItem('message',JSON.stringify(this.messages));
    }
    socket.onopen = function () {
      socket.send(message);
      socket.close();
    }
// Call onopen directly if socket is already open
    if (socket.readyState === WebSocket.OPEN) socket.onopen(event);
  }



  public connect(roomno) {
    // Using share() causes a single websocket to be created when the first observer subscribes. This socket is shared with subsequent observers and closed when the observer count falls to zero.
    return this.outputStream = this.socketFactory.connect(
      "ws://"+ this.url +"/websocket.connect/1/5/147",
      this.inputStream = new QueueingSubject<any>()
    ).share()


    // var loc= window.location
    // var wsStart='ws://'
    // if(loc.protocol== 'https:'){
    //   wsStart = 'wss://'
    // }
    // var endpoint = wsStart + this.url + '/websocket.connect/'+roomno+'/'
    // var socket = new WebSocket(endpoint);
    // console.log('dsadasdussamashek',socket);


//     let socket = new WebSocket("ws://"+ this.url +"/chat/" + roomno + "/");
//     console.log('Coonect',socket);
//     socket.onmessage = function (e) {
//       console.log(e.data);
//       // this.messages.push(e.data);
//       // localStorage.setItem('message',JSON.stringify(this.messages));
//     }
//     socket.onopen = function () {
//       console.log('Connected.')
//     }
// // Call onopen directly if socket is already open
//     if (socket.readyState === WebSocket.OPEN) socket.onopen(event);
  }

  public send(message: any): void {
    // console.log('sending : ' + message);
    // If the websocket is not connected then the QueueingSubject will ensure
    // that messages are queued and delivered when the websocket reconnects.
    // A regular Subject can be used to discard messages sent when the websocket
    // is disconnected.
    this.inputStream.next(message)
  }

  fetchUsersForChat(username) {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' +  this.authentication);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.apiUrl + 'chat/chatusers/' + username, {headers: headers}).map((response: Response) => response.json());
  }

  fetchMessages(id) {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + this.authentication);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.apiUrl + 'webchat/messages/' + id, {headers: headers}).map((response: Response) => response.json());
  }

  fetchAllChatUsers() {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + this.authentication);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.apiUrl + 'chat/allchatusers/', {headers: headers}).map((response: Response) => response.json());
  }

  AddGetRoom(hfw, lfw) {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + this.authentication);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.apiUrl + 'chat/room/',
      JSON.stringify({
        HFW: hfw,
        LFW: lfw,
        RoomNo: '1',
        Deleted: false
      }), {headers: headers}).map((data: Response) => data.json());
  }
}
