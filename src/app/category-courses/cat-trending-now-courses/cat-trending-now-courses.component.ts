import { Component, OnInit } from '@angular/core';
import {Config} from '../../Config';
import {GlobalService} from '../../global.service';
import {SimpleGlobal} from 'ng2-simple-global';
import {AddCartDialogComponent} from "../../cart-dialog/add-cart-dialog.component";
import swal from 'sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from "@angular/material";
import {CoursesService} from "../../course/courses.service";
import {isNullOrUndefined} from "util";
import { BuynowDialogComponent } from '../../buynow-dialog/buynow-dialog.component';

declare const $: any;
@Component({
  selector: 'app-cat-trending-now-courses',
  templateUrl: './cat-trending-now-courses.component.html',
  styleUrls: ['../../popular-courses/popular-courses.component.css']
})
export class CatTrendingNowCoursesComponent implements OnInit {

  public trendingNowCourses: any=[];
  public ImageUrl = Config.ImageUrl;
  Logedin: string;
  public GlobalWishListCourses:any = [];
  public loaded: boolean = false;
  private category: any;

  constructor(private obj_CoursesService: CoursesService,private glb_ser: SimpleGlobal, private global: GlobalService, private nav: Router,
              public dialog: MatDialog, private obj: CoursesService) {

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
    this.global.catName$.subscribe(
      data => {
        this.category = data;
        if(this.category.id!=''){
          this.obj.get_courses_by_category(1,this.category.id).subscribe(response => {
            this.trendingNowCourses = response;
            if(this.trendingNowCourses['courses'].length>0){
              this.loaded = true;
            }
            // console.log(this.loaded);
          });
        }
      });


  }
  private enrolled: any;

  enrollCourse(index, course_id): void {
    if (this.Logedin === '1') {
      this.obj_CoursesService.enroll_free_course(course_id).subscribe(
        data => {
          this.enrolled = data[0]['json'].json();
          if(this.enrolled.status===false) {
            swal({
              type: 'error',
              title: 'You Already Enrolled This Course.',
              showConfirmButton: false,
              width: '512px',
              timer: 2000
            })
          }
          else {
            swal({
              type: 'success',
              title: 'Success! <br> Successfuly Purchased.',
              showConfirmButton: false,
              width: '512px',
              timer: 3000,
            });
          }
        },
        error => {
          // console.log(error);
        }
      );
    }
    else {
      swal({
        type: 'error',
        title: 'Authentication Required <br> Please Login or Signup first',
        showConfirmButton: false,
        width: '512px',
        timer: 1500
      });
      this.nav.navigate(['login']);
    }
  }
  buyNowClick(index, course_id): void {
    this.obj_CoursesService.buyNowcheck(index, course_id,this.Logedin).subscribe(
      data => {
        // alert(data.message)
       if(this.Logedin === '1' && data.message=="Course is already in your My Courses"){
        swal({
          type: 'error',
          title: 'You Already Bought this course',
          showConfirmButton: false,
          width: '512px',
          timer: 1500
        });
       }
    else if (this.Logedin === '1' && data.message != "Course is already in your My Courses") {
      const dialogRef = this.dialog.open(BuynowDialogComponent, {
        width: '500px',
        data: { course_id: course_id,
          // CourseDetail: this.Courses
        }
      });
    } else {
     
        swal({
          type: 'error',
          title: 'Authentication Required <br> Please Login or Signup first',
          showConfirmButton: false,
          width: '512px',
          timer: 1500
        });
      
      this.nav.navigate(['login']);
    }})
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
      CatTrendingNowCoursesComponent.Authenticat();
      this.nav.navigate(['login']);
    }
  }


  onclick(index, course_id) {
    if (this.Logedin === '1') {
      this.obj.add_wishlist(course_id).subscribe(
        data => {
          // console.log(data[0]['json'].json());
          if(data[0]['json'].json().hasOwnProperty("status")) {
            CatTrendingNowCoursesComponent.AlreadyInWishlistError();
          }
          else {
            // console.log('enter in Else Block');
            this.GlobalWishListCourses.push(data[0]['json'].json());
            this.global.getGolbalWishListCourses(this.GlobalWishListCourses);
            CatTrendingNowCoursesComponent.wishlistSuccess();
          }
        },
        error => {
          // console.log(error);
        }
      );
    }
    else {
      CatTrendingNowCoursesComponent.Authenticat();
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
