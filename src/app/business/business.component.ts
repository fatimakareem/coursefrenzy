import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {HeaderService} from "../header/header.service";
import {CoursesService} from "../course/courses.service";
import {CoursesOnBidComponent} from '../courses-all/courses-on-bid/courses-on-bid.component';
import {BiddingDialogComponent} from '../bidding-dialog/bidding-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import swal from 'sweetalert2';
import {GlobalService} from '../global.service';
import {AddCartDialogComponent} from '../cart-dialog/add-cart-dialog.component';
import {CatTopRatedCoursesComponent} from '../category-courses/cat-top-rated-courses/cat-top-rated-courses.component';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {
  public Categories: any;
  public topRatedCoursesviaCategories: any;
  public ImageUrl = 'https://storage.coursefrenzy.com/final/';
  public showCourses: boolean = true;
  Logedin: string;
  private route: ActivatedRoute;
  public GlobalWishListCourses: any= [];
  private category: any;
  public topRatedCourses: any;
  public loaded: boolean = false;
  constructor(private obj2: HeaderService,
              private obj: CoursesService,
              private nav: Router,
              private dialog: MatDialog,
              private global: GlobalService,
              @Inject(PLATFORM_ID) private platformId: Object) {
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

  ngOnInit() {
    this.obj2.get_categories().subscribe(response => {
          this.Categories = response;
        });
        this.obj.get_top_rated_courses_via_cat(1,2).subscribe(response => {
          // console.log(response);
          if (this.topRatedCoursesviaCategories===[]){
            this.showCourses = false;
            // alert('Show Courses are going to set false');
          }else{
            this.topRatedCoursesviaCategories = response;
            // console.log(this.topRatedCoursesviaCategories['courses']);
          }
        });
  //   this.global.catName$.subscribe(
  //     data => {
  //       this.category = data;
  //       this.obj.get_top_rated_courses_via_cat(1,this.category.id).subscribe(response => {
  //         this.topRatedCourses = response;
  //         // console.log("Top rated"+this.topRatedCourses['courses'].course[0]);
  //         if(this.topRatedCourses['courses'].length>0){
  //           // this.loaded = true;
  //         }
  // });
  //     });
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
      CatTopRatedCoursesComponent.Authenticat();
      this.nav.navigate(['login']);
    }
  }
  onclick(index, course_id) {
    if (this.Logedin === '1') {
      this.obj.add_wishlist(course_id).subscribe(
        data => {
          // console.log(data[0]['json'].json());
          if(data[0]['json'].json().hasOwnProperty("status")) {
            CatTopRatedCoursesComponent.AlreadyInWishlistError();
          }
          else {
            this.GlobalWishListCourses.push(data[0]['json'].json());
            this.global.getGolbalWishListCourses(this.GlobalWishListCourses);
            CatTopRatedCoursesComponent.wishlistSuccess();
          }
        },
        error => {
          // console.log(error);
        }
      );
    }
    else {
      CatTopRatedCoursesComponent.Authenticat();
      this.nav.navigate(['login']);
    }
  }
   Authenticat() {
    swal({
      type: 'error',
      title: 'Authentication Required <br> Please Login or Signup first',
      showConfirmButton: false,
      width: '512px',
      timer: 1500
    });
  }
  AlreadyInWishlistError() {
    swal({
      type: 'warning',
      title: 'Oops! <br> This course already exists in your wishlist!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

   wishlistSuccess() {
    swal({
      type: 'success',
      title: 'Success! <br> Successfuly added to wishlist.',
      showConfirmButton: false,
      width: '512px',
      timer: 2000,
      position: 'top-end'
    });
  }
}
