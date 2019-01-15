import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Config} from '../Config';
import {NgForm} from '@angular/forms';
import {FormControl, NgModel, Validators, ReactiveFormsModule} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';
import {AuthGuard} from "../auth-guard/auth-guard.service";
import {CoursesService} from "../course/courses.service";
import {GlobalService} from "../global.service";
import {CourseCheckoutService} from "../course-checkout/course-checkout.service";

@Component({
  selector: 'app-add-cart-dialog',
  templateUrl: './add-cart-dialog.component.html',
  styleUrls: ['../events/add-event.component.css']
})
export class AddCartDialogComponent implements OnInit {
  public wishlistCourses: any=[];
  Logedin: string = '1';
  public model: any = {};
  public promoStatus: any;
  public alreadyInCartStatus: any;
  private SingleCourse: any;
  private BidId: number;
  private sub: Subscription;
  public GlobalCartCourses: any = [];
  public GlobalWishListCourses:any = [];
  public emptyWishlist: boolean;
  public wishPage = 1;

  promo_code = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9_.-@#&*]+?')]);

  constructor(private obj: CoursesService, private route: ActivatedRoute, private global: GlobalService,
              private _courseCheckout: CourseCheckoutService,
              public dialogRef: MatDialogRef<AddCartDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,  private global2: GlobalService, ) {

    this.global.GlobalCartCourses$.subscribe(
      data => {
        if (data.length===0){
          this.GlobalCartCourses = [];
        }else {
          this.GlobalCartCourses = data;
        }
      });

    this.global2.GlobalWishListCourses$.subscribe(
      data => {
        if (data.length===0){
          this.wishlistCourses = [];
        }else {
          this.wishlistCourses = data;
        }
      });

    this.global2.emptyWishlistGlobal$.subscribe(
      data => {
        this.emptyWishlist = data;
      });

  }

  ngOnInit() {
    this.noPromo();
  }

  verifyPromoCode(promo_code) {
    console.log(promo_code,this.data.course_id);
    this._courseCheckout.verify_promo_code(promo_code, this.data.course_id).subscribe(response => {
      this.promoStatus = response;
      // console.log(this.promoStatus);
    });
  }

  onSubmit(f: NgForm) {
    this._courseCheckout.verify_promo_code( this.model.promo_code, this.data.course_id).subscribe(response => {
      this.promoStatus = response;
      // console.log(this.promoStatus);
      // console.log(this.promoStatus.status);
      if (!this.promoStatus.status) {
        AddCartDialogComponent.InvalidPromo();
      }
      else {
        this.obj.add_to_cart(this.data.course_id, this.model.promo_code).subscribe(
          data => {
            console.log(data[0]['json'].json());
            // this.global.getGolbalCartCourses(this.GlobalCartCourses);
            // this.CartSuccess();
            // this.dialogRef.close();
            if(data[0]['json'].json().hasOwnProperty("status")) {
              this.alreadyInCartStatus = true;
              AddCartDialogComponent.AlreadyInCartError();
              this.dialogRef.close();
            }
            else {
              this.GlobalCartCourses.push(data[0]['json'].json());
              this.global.getGolbalCartCourses(this.GlobalCartCourses);
              AddCartDialogComponent.CartSuccess();
              this.dialogRef.close();
            }
          },
          error => {
            // console.log(error);
            AddCartDialogComponent.CartError();
          }
        );
      }
    });
    //

  }

  noPromo() {
    this.obj.add_to_cart_no_promo(this.data.course_id).subscribe(
      data => {
        // console.log(data[0]['json'].json());
        if(data[0]['json'].json().hasOwnProperty("status")) {
          this.alreadyInCartStatus = true;
          AddCartDialogComponent.AlreadyInCartError();
          this.dialogRef.close();
        } else {
          this.wishlistCourses.splice(this.wishlistCourses.indexOf(this.wishlistCourses[this.data.index]),1);
          this.GlobalCartCourses.push(data[0]['json'].json());
          this.global.getGolbalCartCourses(this.GlobalCartCourses);
          AddCartDialogComponent.CartSuccess();
          this.dialogRef.close()
          this.obj.removeFromWishlist(this.data.course_id).subscribe(
            data => {
              console.log(data);
              // this.wishlistCourses.splice(this.wishlistCourses.indexOf(this.wishlistCourses[index]),1);
              // console.log(this.wishlistCourses);
              // if (this.Logedin === '1') {
              this.obj.get_wishlist_courses(this.wishPage).subscribe(response => {
                if(!response.status){

                }
                if(response.hasOwnProperty("status")) {
                  this.wishlistCourses = [];
                  this.emptyWishlist = true;
                }
                else {
                  this.wishlistCourses = response;
                  // alert('total Wishlist Courses' + this.wishlistCourses.length);
                  this.global2.getGolbalWishListCourses(this.wishlistCourses);
                  this.emptyWishlist = false;
                }

              });
              // }
            });
        }

      },
      error => {
        // console.log(error);
        AddCartDialogComponent.CartError();
      }
    );

  }

  static CartSuccess() {
    swal({
      type: 'success',
      title: 'Success <br> Course Added to Cart!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  static CartError() {
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


  static InvalidPromo() {
    swal({
      type: 'error',
      title: 'Oops! <br> Promo code is not valid',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
