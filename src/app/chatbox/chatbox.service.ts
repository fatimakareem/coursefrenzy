import 'rxjs/add/operator/map';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Http , Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Config} from '../Config';
import {HeadersService} from '../headers.service';
import { Subject } from 'rxjs/Rx';
import { WebsocketService } from '../websocket.service';
import {Headers } from '@angular/http';

const CHAT_URL = 'ws://' + '192.168.30.132:8000/'+'websocket.connect/1/5/147';

export interface Message {
	author: string,
	message: string
}
@Injectable()

export class ChatboxService {
  public messages: Subject<Message>;
  // public messages: Subject<Message>;

  
	
	
  constructor(private http: Http, private _http2: Http, private _nav: Router, @Inject(PLATFORM_ID) private platformId: Object,private headers: HeadersService,wsService: WebsocketService) {	
    // this.messages = <Subject<Message>>wsService
    // .connect(CHAT_URL)
    // .map((response: MessageEvent): Message => {
    //   let data = JSON.parse(response.data);
    //   return {
    //     author: data.author,
    //     message: data.message
    //   }
    // });
   
  }
  searchTeacher(query) {
    const headers = new Headers();
    if (localStorage.getItem('Authorization'))
    {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    return this._http2.post('http://192.168.29.132:4000/webchat/searchuser/',
      {
        'query': query,
      },{headers: headers}).map((res: Response) => {
      if (res) {
        if (res.status === 201 || res.status === 200 || res.status === 202) {
          return res.json();
        } else if (res.status === 5300) {
          return [{status: res.status, json: res}];
        } else {
        }
      }
    }).catch((error: any) => {
      if (error.status === 404) {
        return Observable.throw(new Error(error.status));
      } else if (error.status === 400) {
        return Observable.throw(new Error(error.status));
      } else {
        return Observable.throw(new Error(error.status));
      }
    });}
  }
  getTeacher() {
    const headers = new Headers();
    if (localStorage.getItem('Authorization'))
    {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    return this._http2.get('http://192.168.29.132:4000/webchat/All_Teacher_for_chat/',{headers: headers}
     ).map((res: Response) => {
      if (res) {
        if (res.status === 201 || res.status === 200 || res.status === 202) {
          return res.json();
        } else if (res.status === 5300) {
          return [{status: res.status, json: res}];
        } else {
        }
      }
    }).catch((error: any) => {
      if (error.status === 404) {
        return Observable.throw(new Error(error.status));
      } else if (error.status === 400) {
        return Observable.throw(new Error(error.status));
      } else {
        return Observable.throw(new Error(error.status));
      }
    });}
  }
  get_messages(roomId,page) {
    return this._http2.get('http://192.168.29.132:4000/webchat/messages/' + roomId +'/'+page,{headers: this.headers.getHeaders()}).map((response: Response) => response.json());
  }
  post_messages(roomId,Testing) {
    // alert('user1'+Testing);
    // alert('user2'+user2);
    const headers = new Headers();
    if (localStorage.getItem('Authorization'))
    {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    return this._http2.post('http://192.168.29.132:4000/webchat/messages/' + roomId +'/'+10,
      {
        'MessageText': Testing
      },{headers: headers}).map((res: Response) => {
      if (res) {
        if (res.status === 201 || res.status === 200 || res.status === 202) {
          return res.json();
        } else if (res.status === 5300) {
          return [{status: res.status, json: res}];
        } else {
        }
      }
    }).catch((error: any) => {
      if (error.status === 404) {
        return Observable.throw(new Error(error.status));
      } else if (error.status === 400) {
        return Observable.throw(new Error(error.status));
      } else {
        return Observable.throw(new Error(error.status));
      }
    });}
  }

  getRoom(user1,user2) {
    // alert('user1'+user1);
    // alert('user2'+user2);
    return this._http2.post('http://192.168.29.132:4000/webchat/allrooms/',
      {
        // 'user1': user1,
        'user2': user1,
      },{headers: this.headers.getHeaders()}).map((res: Response) => {
      if (res) {
        if (res.status === 201 || res.status === 200 || res.status === 202) {
          return res.json();
        } else if (res.status === 5300) {
          return [{status: res.status, json: res}];
        } else {
        }
      }
    }).catch((error: any) => {
      if (error.status === 404) {
        return Observable.throw(new Error(error.status));
      } else if (error.status === 400) {
        return Observable.throw(new Error(error.status));
      } else {
        return Observable.throw(new Error(error.status));
      }
    });
  }



}
