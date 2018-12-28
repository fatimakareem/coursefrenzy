import {Inject, Injectable} from '@angular/core';
import swal from 'sweetalert2';
import {CoursesService} from "./course/courses.service";
import {GlobalService} from "./global.service";
import {Router} from '@angular/router';


@Injectable()
export class BuyNowService  {
  public GlobalCartCourses: any = [];

  constructor(
    private obj: CoursesService,
    private global: GlobalService,
    private nav: Router
  ){
    this.global.GlobalCartCourses$.subscribe(
      data => {
        if(data.length===0){
          this.GlobalCartCourses = [];
        }else{
          this.GlobalCartCourses = data;
        }
      });
  }
  
  public buyNow(index, course_id,Logedin): void {
    if (Logedin === '1') {
      this.obj.add_to_cart_no_promo(course_id).subscribe(
        data => {
          // console.log(data[0]['json'].json());
          if(data[0]['json'].json().hasOwnProperty("status")) {
            BuyNowService.AlreadyInCartError();
            this.nav.navigate(['/checkout']);
          }
          else {
            this.GlobalCartCourses.push(data[0]['json'].json());
            this.global.getGolbalCartCourses(this.GlobalCartCourses);
            BuyNowService.buySuccess();
            this.nav.navigate(['/checkout']);
          }
        },
        error => {
          // console.log(error);
          BuyNowService.buyError();
        }
      );

    } else {
      BuyNowService.Authenticat();
      this.nav.navigate(['login']);
    }
  }


  static buySuccess() {
    swal({
      type: 'success',
      title: 'Success! <br> Pay for the course and purchase it!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  static buyError() {
    swal({
      type: 'error',
      title: 'Oops <br> Failed to add to Cart!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }
  static AlreadyInCartError() {
    swal({
      type: 'warning',
      title: 'Oops! <br> This course already exists in your cart!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
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
