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
  selector: 'app-nestedsubcat-trending-now-courses',
  templateUrl: './nestedsubcat-trending-now-courses.component.html',
  styleUrls: ['./nestedsubcat-trending-now-courses.component.scss']
})
export class NestedsubcatTrendingNowCoursesComponent implements OnInit {
  subcategory: any;

  public trendingNowCourses: any=[];
  public ImageUrl = Config.ImageUrl;
  Logedin: string;
  public GlobalWishListCourses:any = [];
  public loaded:boolean  =  false;
  public slideConfig;
  constructor(private glb_ser: SimpleGlobal, private global: GlobalService, private nav: Router,
              public dialog: MatDialog, private obj: CoursesService) {

    this.global.caseNumber$.subscribe(
      data => {
        this.Logedin = data;
      });


    this.global.GlobalWishListCourses$.subscribe(
      data => {
        if (data.length === 0){
          this.GlobalWishListCourses = [];
        } else  {
          this.GlobalWishListCourses = data;
        }
      });


      this.slideConfig = {
        infinite: false,
        speed: 900,
        autoplay: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        prevArrow: '<button class="leftRs">&lt;</button>',
        nextArrow: '<button class="rightRs">&lt;</button>',
        responsive: [
          {
            breakpoint: 1025,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              infinite: true
            }
          },
          {
            breakpoint: 769,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
  ]};


  }
  private enrolled: any;

  enrollCourse(index, course_id): void {
    if (this.Logedin === '1') {
      this.obj.enroll_free_course(course_id).subscribe(
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
    this.obj.buyNowcheck(index, course_id,this.Logedin).subscribe(
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
  ngOnInit() {
    this.global.subCatName$.subscribe(
      data => {
        this.subcategory = data;
        console.log(this.subcategory);
        if(this.subcategory.id!=''){
          this.obj.get_courses_by_nestedsubcategory(1,this.subcategory.id).subscribe(response => {
            this.trendingNowCourses = response;
            if(this.trendingNowCourses['courses'].length > 0) {
              this.loaded = true;
            }
            // console.log(this.loaded);

            

          });
        }
      });


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
      NestedsubcatTrendingNowCoursesComponent.Authenticat();
      this.nav.navigate(['login']);
    }
  }


  onclick(index, course_id) {
    if (this.Logedin === '1') {
      this.obj.add_wishlist(course_id).subscribe(
        data => {
          // console.log(data[0]['json'].json());
          if(data[0]['json'].json().hasOwnProperty("status")) {
            NestedsubcatTrendingNowCoursesComponent.AlreadyInWishlistError();
          }
          else {
            // console.log('enter in Else Block');
            this.GlobalWishListCourses.push(data[0]['json'].json());
            this.global.getGolbalWishListCourses(this.GlobalWishListCourses);
            NestedsubcatTrendingNowCoursesComponent.wishlistSuccess();
          }
        },
        error => {
          // console.log(error);
        }
      );
    }
    else {
      NestedsubcatTrendingNowCoursesComponent.Authenticat();
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