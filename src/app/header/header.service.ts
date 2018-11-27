import 'rxjs/add/operator/map';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Http , Headers , Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import {getDate} from 'ngx-bootstrap/bs-moment/utils/date-getters';
// import {log} from "util";
import { Config} from '../Config';
import {isPlatformBrowser} from "@angular/common";

@Injectable()

export class HeaderService {
  constructor(private http: Http, private _http2: Http, private _nav: Router, @Inject(PLATFORM_ID) private platformId: Object) {
  }
  get_categories() {
    return this._http2.get( Config.api + 'courses/allcat/').map((response: Response) => response.json());
  }
  get_single_category(cat_id) {
    return this._http2.get( Config.api + 'courses/get_single_cat/'+cat_id+'').map((response: Response) => response.json());
  }

  get_single_sub_category(subcat_id) {
    return this._http2.get( Config.api + 'courses/get_single_subcat/' + subcat_id + '').map((response: Response) => response.json());
  }
  get_sub_categories(cat_id) {
    return this._http2.get( Config.api + 'courses/subcat/' + cat_id + '/').map((response: Response) => response.json());
  }
  search(query) {
    return this._http2.put(Config.api + 'courses/search/',
      {
        'query': query,
      }).map((res: Response) => {
      if (res) {
        if (res.status === 201 || res.status === 200) {
          const responce_data = res.json();
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

  logout() {
    const headers = new Headers();

    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.get( Config.api + 'courses/search/', {headers : headers}).map((response: Response) => response.json());
  }

  Biduser(){

    const headers = new Headers();

    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.get( Config.api + 'courses/bid_Result_User/', {headers : headers}).map((response: Response) => response.json());
  }
  Notifications(){

    const headers = new Headers();

    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.get(  Config.api + 'courses/user_notifications/', {headers : headers}).map((response: Response) => response.json());
  }

}




