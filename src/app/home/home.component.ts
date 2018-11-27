import {Component, OnInit, OnDestroy, PLATFORM_ID, Inject} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {HomeService} from './home.service';
import {GlobalService} from '../global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  getingRoleData: any;
  public UserRole: any;
  private loaded = false;
  checkLogin: string = '1';

  constructor( @Inject(PLATFORM_ID) private platformId: Object, private obj: HomeService, private global: GlobalService) {
    this.global.caseNumber$.subscribe(
      data => {
        this.checkLogin = data;
      });
    this.global.checkingUserRole$.subscribe(
      data => {
        this.UserRole = data;
        // alert('Geting DAta From Shared Service' + this.UserRole);
      });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('home', 'true');
    }

    if (this.checkLogin === '1') {
      this.obj.get_role().subscribe(response => {
        this.getingRoleData = response;
        this.UserRole = this.getingRoleData.Role;
        // alert('Home Role' + this.UserRole);
        this.global.checkUserRole(this.UserRole);
        this.loaded = true;
      });
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('home', 'false');
    }
  }
}
