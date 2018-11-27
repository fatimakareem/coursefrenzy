import {Component, Input, OnInit} from '@angular/core';
import {Config} from '../../Config';
import {GlobalService} from '../../global.service';
import {SimpleGlobal} from 'ng2-simple-global';
import {AddCartDialogComponent} from "../../cart-dialog/add-cart-dialog.component";
import swal from 'sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from "@angular/material";
import {CoursesService} from "../../course/courses.service";
@Component({
  selector: 'app-teaches-by-teacher',
  templateUrl: './teaches-by-teacher.component.html',
  styleUrls: ['./teaches-by-teacher.component.scss']
})
export class TeachesByTeacherComponent implements OnInit {
  teacherID: number;
  // @Input() teacherID: number;
  public topRatedCourses: any;
  public ImageUrl = Config.ImageUrl;
  Logedin: string;
  public GlobalWishListCourses: any=[];
  public loaded: boolean = false;
  constructor(private glb_ser: SimpleGlobal, private global: GlobalService, private nav: Router,
              public dialog: MatDialog, private obj: CoursesService) {

    this.global.caseNumber$.subscribe(
      data => {
        this.Logedin = data;
      });

    this.global.teacherID$.subscribe(
      data => {
        this.teacherID = data;
        // alert("Teacher Id from Global Calling " + this.teacherID );
        if(this.teacherID!=0){
          this.obj.get_teacher_courses(1,this.teacherID).subscribe(response => {
            this.topRatedCourses = response;
            console.log(this.topRatedCourses);
            // console.log("Top rated"+this.topRatedCourses['courses'].course[0]);
            this.loaded = true;
          });
        }
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
    // this.obj.get_teacher_courses(1,1).subscribe(response => {


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
      TeachesByTeacherComponent.Authenticat();
      this.nav.navigate(['login']);
    }
  }
  onclick(index, course_id) {
    if (this.Logedin === '1') {
      this.obj.add_wishlist(course_id).subscribe(
        data => {
          // console.log(data[0]['json'].json());
          if(data[0]['json'].json().hasOwnProperty("status")) {
            TeachesByTeacherComponent.AlreadyInWishlistError();
          }
          else {
            this.GlobalWishListCourses.push(data[0]['json'].json());
            this.global.getGolbalWishListCourses(this.GlobalWishListCourses);
            TeachesByTeacherComponent.wishlistSuccess();
          }
        },
        error => {
          // console.log(error);
        }
      );
    }
    else {
      TeachesByTeacherComponent.Authenticat();
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
