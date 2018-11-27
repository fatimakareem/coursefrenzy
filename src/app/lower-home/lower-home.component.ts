import { Component, OnInit } from '@angular/core';
import {EventsService} from '../events/events.service';
import {HomeService} from '../home/home.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material';
import {NgForm} from '@angular/forms';
import swal from 'sweetalert2';
import {GlobalService} from '../global.service';

@Component({
  selector: 'app-lower-home',
  templateUrl: './lower-home.component.html',
  styleUrls: ['./lower-home.component.css']
})
export class LowerHomeComponent implements OnInit {
  public AllEvents;
  loaded = false;
  checkLogin: number;
  public newsANDevents_content: any;
  id;
  public userRole: string;

  constructor(private obj: EventsService, private obj2: HomeService, private route: ActivatedRoute,
              private router: Router, public dialog: MatDialog, private global: GlobalService) {
    // this.global.caseNumber$.subscribe(
    //   data => {
    //     this.checkLogin = data;
    //   });
    // this.global.checkingUserRole$.subscribe(
    //   data => {
    //     this.userRole = data;
    //   });
  }

  ngOnInit() {
    // this.obj.get_events(1).subscribe(response => {
    //   this.AllEvents = response;
    //   this.loaded = true;
    // });
    // this.obj2.get_newsANDevents_content().subscribe(response => {
    //   this.newsANDevents_content = response;
    //   this.loaded = true;
    // });
  }

  // openDialog(benefit_id): void {
  //   const dialogRef = this.dialog.open(EditHomeCoursesEventsSectionComponent, {
  //     width: '500px',
  //     data: {benefit_id: benefit_id},
  //   });
  // }

}

@Component({
  selector: 'app-edit-home-courses-events-section',
  templateUrl: '../lower-home/edit-home-courses-events-section.component.html',
  styleUrls: ['../events/add-event.component.css']
})
export class EditHomeCoursesEventsSectionComponent implements OnInit {
  public model: any = {};
  private loaded = false;
  public Courses_Content: any;
  public newsANDevents_content: any;
  public id;
  constructor(private obj: HomeService,
              public dialogRef: MatDialogRef<EditHomeCoursesEventsSectionComponent>) { }

  ngOnInit() {
    // this.obj.get_newsANDevents_content().subscribe(response => {
    //   this.newsANDevents_content = response;
    //   this.loaded = true;
    //   this.id = this.newsANDevents_content.id;
    //   this.model.heading = this.newsANDevents_content.heading;
    //   this.model.description = this.newsANDevents_content.description;
    //
    // });
  }

  // onSubmit(f: NgForm) {
  //   this.obj.update_home_events_content(this.id, this.model.heading, this.model.description).subscribe(
  //     data => {
  //       this.dialogRef.close();
  //       this.EditSuccess();
  //     },
  //     error => {
  //     }
  //   );
  // }
  // EditSuccess() {
  //   swal({
  //     type: 'success',
  //     title: 'Edit Success <br> Changes saved into database!',
  //     showConfirmButton: false,
  //     width: '512px',
  //     timer: 2500
  //   })
  // }
  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

}
