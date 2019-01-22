import { Component, OnInit } from '@angular/core';
import {HeaderService} from '../header/header.service';
import {Config} from '../Config';
import {CourseCheckoutService} from '../course-checkout/course-checkout.service';
import {AddCartDialogComponent} from '../cart-dialog/add-cart-dialog.component';
import {RecentlyViewedCoursesComponent} from '../courses-all/recently-viewed-courses/recently-viewed-courses.component';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalService} from '../global.service';
import { WinbidDialogComponent } from '../winbid-dialog/winbid-dialog.component';

@Component({
  selector: 'app-winbid-user',
  templateUrl: './winbid-user.component.html',
  styleUrls: ['./winbid-user.component.scss']
})
export class WinbidUserComponent implements OnInit {
public response: any = [];
  public res:any = [];
public check: any = [];
  Logedin: string;
  public GlobalWishListCourses: any;
   finalResult = [];
  public ImageUrl = Config.ImageUrl;
  constructor(private obj: HeaderService, private Checks: CourseCheckoutService, public dialog: MatDialog, private nav: Router, private global: GlobalService) {


    this.global.caseNumber$.subscribe(
      data => {
        this.Logedin = data;
      });
  }

  ngOnInit() {
    this.GetBidUser();

  }

  //
  // GetBidUser()
  // {
  //
  //   this.obj.Biduser().subscribe(data => {
  //     this.response = data;
  //     for(let arr in this.response){
  //       for(let arr2 in this.response[arr])
  //         for(let arr3 in this.response[arr][arr2]) {
  //         this.finalResult.push(this.response[arr][arr2][arr3]);
  //           console.log(this.finalResult);
  //         }
  //     }
  //     console.log(this.response);
  //   });
  // }

  GetBidUser(){
    this.obj.Biduser().subscribe(data =>{

      this.response = data['Win List'];
      this.res = data['Lose List'];

    })


  }
  openDialog2(index, course_id): void {
    // alert(course_id);
   
    if (this.Logedin === '1') {
      const dialogRef = this.dialog.open(WinbidDialogComponent, {
        width: '500px',
        data: { course_id: course_id,
          // CourseDetail: this.Courses
        }
      });
    } else {
      RecentlyViewedCoursesComponent.Authenticat();
      this.nav.navigate(['login']);
    }
  }

}
