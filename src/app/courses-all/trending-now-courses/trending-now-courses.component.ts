import { Component, OnInit } from '@angular/core';
import {Config} from '../../Config';
import {GlobalService} from '../../global.service';
import {SimpleGlobal} from 'ng2-simple-global';
import {AddCartDialogComponent} from "../../cart-dialog/add-cart-dialog.component";
import swal from 'sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from "@angular/material";
import {CoursesService} from "../../course/courses.service";
import {BuyNowService} from "../../BuyNow.service";
import {PagerService} from "../../paginator.service";

// import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
declare const $: any;

@Component({
  selector: 'app-trending-now-courses',
  templateUrl: './trending-now-courses.component.html',
  styleUrls: ['../../popular-courses/popular-courses.component.css']
})
export class TrendingNowCoursesComponent implements OnInit {
  pager: any = {};

  public trendingNowCourses: any=[];
  public ImageUrl = Config.ImageUrl;
  Logedin: string;
  public GlobalWishListCourses:any = [];
  public loaded: boolean = false;
  private enrolled: any;
  public slideConfig;
  constructor(private glb_ser: SimpleGlobal, private global: GlobalService, private nav: Router,
              public dialog: MatDialog, private obj: CoursesService, private buyNowService: BuyNowService, private pagerService: PagerService) {
    // config.max = 5;
    // config.readonly = true;

    this.global.caseNumber$.subscribe(
      data => {
        this.Logedin = data;
      });

    this.global.GlobalWishListCourses$.subscribe(
      data => {
        if (data.length===0){
          this.GlobalWishListCourses = [];
        }else {
          this.GlobalWishListCourses = data;
        }
      });
  }
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.obj.trending_now(page).subscribe(response => {
      this.trendingNowCourses = response;
      // console.log(this.topRatedCourses['courses']);
      this.pager = this.pagerService.getPager(this.trendingNowCourses['totalItems'], page,20);
      this.loaded = true;
    });
  }
  ngOnInit() {

   this.setPage(1);

  }
  buyNowClick(index, course_id): void {
    this.buyNowService.buyNow(index, course_id,this.Logedin)
  }


  openDialog2(index, course_id): void {
    if (this.Logedin === '1') {
      const dialogRef = this.dialog.open(AddCartDialogComponent, {
        width: '500px',
        data: { course_id: course_id,
          // CourseDetail: this.Courses
        }
      });
    } else {
      TrendingNowCoursesComponent.Authenticat();
      this.nav.navigate(['login']);
    }
  }
  enrollCourse(index, course_id): void {
    if (this.Logedin === '1') {
      this.obj.enroll_free_course(course_id).subscribe(
        data => {
          this.enrolled = data[0]['json'].json();
          if(this.enrolled.status===false) {
            TrendingNowCoursesComponent.EnrollmentError();
          }
          else {
            TrendingNowCoursesComponent.EnrollmentSuccess();
          }
        },
        error => {
          // console.log(error);
        }
      );
    }
    else {
      TrendingNowCoursesComponent.Authenticat();
      this.nav.navigate(['login']);
    }
  }


  onclick(index, course_id) {
    if (this.Logedin === '1') {
      this.obj.add_wishlist(course_id).subscribe(
        data => {
          // console.log(data[0]['json'].json());
          if(data[0]['json'].json().hasOwnProperty("status")) {
            TrendingNowCoursesComponent.AlreadyInWishlistError();
          }
          else {
            // console.log('enter in Else Block');
            this.GlobalWishListCourses.push(data[0]['json'].json());
            this.global.getGolbalWishListCourses(this.GlobalWishListCourses);
            TrendingNowCoursesComponent.wishlistSuccess();
          }
        },
        error => {
          // console.log(error);
        }
      );
    }
    else {
      TrendingNowCoursesComponent.Authenticat();
      this.nav.navigate(['login']);
    }
  }

  static AlreadyInWishlistError() {
    swal({
      type: 'warning',
      title: 'Oops! <br> This course already exists in your wishlist!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }
  static EnrollmentError() {
    swal({
      type: 'error',
      title: 'Oops! <br> Error in Buy Course!',
      showConfirmButton: false,
      width: '512px',
      timer: 2000
    })
  }
  static EnrollmentSuccess() {
    swal({
      type: 'success',
      title: 'Success! <br> Successfuly Purchased.',
      showConfirmButton: false,
      width: '512px',
      timer: 3000,
    });
  }

  static wishlistSuccess() {
    swal({
      type: 'success',
      title: 'Success! <br> Successfuly added to wishlist.',
      showConfirmButton: false,
      width: '512px',
      timer: 2000,
      position: 'top-end'
    });
  }


  static Authenticat() {
    swal({
      type: 'error',
      title: 'Authentication Required <br> Please Login or Signup first',
      showConfirmButton: false,
      width: '512px',
      timer: 1500
    });
  }


}
