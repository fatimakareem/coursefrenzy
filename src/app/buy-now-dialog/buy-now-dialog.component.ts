import {Component, Inject, OnInit} from '@angular/core';
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
  selector: 'app-buy-now-dialog',
  templateUrl: './buy-now-dialog.component.html',
  styleUrls: ['../events/add-event.component.css']
})
export class BuyNowDialogComponent implements OnInit {

  public model: any = {};
  public promoStatus: any;
  private SingleCourse: any;
  private BidId: number;
  private sub: Subscription;
  public GlobalCartCourses = [];

  promo_code = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9_.-@#&*]+?')]);


  constructor(private obj: CoursesService, private route: ActivatedRoute, private global: GlobalService,
              private _courseCheckout: CourseCheckoutService,
              public dialogRef: MatDialogRef<BuyNowDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  verifyPromoCode(promo_code) {
    this._courseCheckout.verify_promo_code(promo_code, this.data.course_id).subscribe(response => {
      this.promoStatus = response;
      console.log(this.promoStatus);
    });
  }

  onSubmit(f: NgForm) {
    this._courseCheckout.verify_promo_code(this.model.promo_code, this.data.course_id).subscribe(response => {
      this.promoStatus = response.statues;
      console.log(this.promoStatus);
      if (this.promoStatus.status) {
        this.InvalidPromo();
      }
    });

    // this.obj.add_to_cart(this.data.course_id, this.model.promo_code).subscribe(
    //   data => {
    //     console.log(data[0]['json'].json());
    //     this.GlobalCartCourses.push(data[0]['json'].json());
    //     this.global.getGolbalCartCourses(this.GlobalCartCourses);
    //     this.CartSuccess();
    //     this.dialogRef.close();
    //   },
    //   error => {
    //     // console.log(error);
    //     this.CartError();
    //   }
    // );
  }

  noPromo() {
    this.obj.add_to_cart_no_promo(this.data.course_id).subscribe(
      data => {
        console.log(data[0]['json'].json());

        this.GlobalCartCourses.push(data[0]['json'].json());
        this.global.getGolbalCartCourses(this.GlobalCartCourses);
        this.CartSuccess();
        this.dialogRef.close();
      },
      error => {
        // console.log(error);
        this.CartError();
      }
    );
  }

  CartSuccess() {
    swal({
      type: 'success',
      title: 'Success <br> Course Added to Cart!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  CartError() {
    swal({
      type: 'error',
      title: 'Oops <br> Failed to add to Cart!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  InvalidPromo() {
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
