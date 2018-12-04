import {Component, OnInit, ViewContainerRef, PLATFORM_ID, Inject} from '@angular/core';
import {ChatComponent} from './chat/chat.component';
import {MatDialog} from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import {GlobalService} from './global.service';
import {SimpleGlobal} from 'ng2-simple-global';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  GlobalChatVar: number;
  LoggedIn: number;
  MainSearch: number;
  title = 'app';
  chatVar = 0;
  public checkLogin;

  constructor(
              public dialog: MatDialog,
              private router: Router,
              vRef: ViewContainerRef,
              private global: GlobalService,
              private glb_ser: SimpleGlobal,
  @Inject(PLATFORM_ID) private platformId: Object ) {
    this.LoggedIn = global.logedin;
    this.GlobalChatVar = global.globalChatVar;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ChatComponent, {
      width: '400px',
      height: '530px',
      // data: {name: this.name, animal: this.animal}
    });
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    window.onbeforeunload = function () {
      $(this).scrollTop(0);
    }
  }

  // openChat(): void {
  //   if(this.btnChat)
  //     this.btnChat = false;
  //   else
  //     this.btnChat = true;
  // }

  openChat() {
    if (this.chatVar === 1) {
      this.chatVar = 0;
    } else {
      this.chatVar = 1;
    }
  }

}


