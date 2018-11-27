import { Component, OnInit } from '@angular/core';
import { LogoutService} from './logout.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private obj: LogoutService, private _nav: Router ) {
  }

  ngOnInit() {
    // this.obj.logout();
    // localStorage.clear();
    // this._nav.navigate(['/home']);

  }
}
