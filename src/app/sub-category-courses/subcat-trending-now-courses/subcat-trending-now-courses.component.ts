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

declare const $: any;
@Component({
  selector: 'app-subcat-trending-now-courses',
  templateUrl: './subcat-trending-now-courses.component.html',
  styleUrls: ['../../popular-courses/popular-courses.component.css']
})
export class SubcatTrendingNowCoursesComponent implements OnInit {
  subcategory: any;

  public trendingNowCourses: any=[];
  public ImageUrl = Config.ImageUrl;
  Logedin: string;
  public GlobalWishListCourses:any = [];
  public loaded:boolean  =  false;

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
  }

  ngOnInit() {
    this.global.subCatName$.subscribe(
      data => {
        this.subcategory = data;
        console.log(this.subcategory);
        if(this.subcategory.id!=''){
          this.obj.get_courses_by_subcategory(1,this.subcategory.id).subscribe(response => {
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
      SubcatTrendingNowCoursesComponent.Authenticat();
      this.nav.navigate(['login']);
    }
  }


  onclick(index, course_id) {
    if (this.Logedin === '1') {
      this.obj.add_wishlist(course_id).subscribe(
        data => {
          // console.log(data[0]['json'].json());
          if(data[0]['json'].json().hasOwnProperty("status")) {
            SubcatTrendingNowCoursesComponent.AlreadyInWishlistError();
          }
          else {
            // console.log('enter in Else Block');
            this.GlobalWishListCourses.push(data[0]['json'].json());
            this.global.getGolbalWishListCourses(this.GlobalWishListCourses);
            SubcatTrendingNowCoursesComponent.wishlistSuccess();
          }
        },
        error => {
          // console.log(error);
        }
      );
    }
    else {
      SubcatTrendingNowCoursesComponent.Authenticat();
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

