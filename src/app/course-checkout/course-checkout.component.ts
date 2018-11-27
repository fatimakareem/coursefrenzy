import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, NgForm, FormControl} from '@angular/forms';
import {UploadCoursesService} from '../upload-courses/upload-courses.service';
import {Config} from '../Config';
import {CourseCheckoutService} from "./course-checkout.service";
import {GlobalService} from "../global.service";
import swal from 'sweetalert2';
@Component({
  selector: 'app-course-checkout',
  templateUrl: './course-checkout.component.html',
  styleUrls: ['./course-checkout.component.css', '../events/add-event.component.css']
})
export class CourseCheckoutComponent implements OnInit {
  public model: any = {};
  public coursesList: any;
  public loaded = false;
  public ImageUrl = Config.ImageUrl;
  public GlobalCartCourses: any=[];
  public emptyCart: boolean;
  public total: number = 0;
  public totalflag: boolean=false;
  public data: boolean=false;
  CCV: FormGroup;
  CardNumber = '^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$';
  ExpiryDate= '([0-9]{2}[/]?){2}';

  ExpiryDateForm = new FormControl('', [
    Validators.required,
    Validators.pattern('([0-9]{2}[/]?){2}'),
  ]);

  CardNumberForm = new FormControl('', [
    Validators.required,
    Validators.pattern(this.CardNumber),
  ]);

  CardCodeForm = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(4)
  ]);
  TotalAmountForm = new FormControl('', [
    Validators.required
  ]);

  constructor(private obj: UploadCoursesService, private obj2: CourseCheckoutService, private global: GlobalService, private formBuilder: FormBuilder ) {

    this.global.GlobalCartCourses$.subscribe(
      data => {
        if(data.length===0){
          this.GlobalCartCourses = [];
        }else{
          this.GlobalCartCourses = data;
          this.seeTotal();
        }

      });

    this.global.emptyCartGlobal$.subscribe(
      data => {
        this.emptyCart = data;
        // alert(this.emptyCart);
      });

  }
  ngOnInit() {
    // this.obj2.get_checkout_courses().subscribe(response => {
    //   this.GlobalCartCourses = response;
    //   console.log('Checkout'+this.GlobalCartCourses);
    //   this.global.getGolbalCartCourses(this.GlobalCartCourses);
    //
    //   this.loaded = true;
    // });
    if(this.GlobalCartCourses.length > 0) {
      this.emptyCart = false;
    }

  }

  seeTotal(){
      this.total = 0;
      for(let list of this.GlobalCartCourses) {
        console.log(list.course.actual_price);
        if(list.promocode === null) {
        this.total = this.total + list.course.actual_price;

        }
        else {
          this.total = this.total + Number(list.promocode.actual);
        }
        console.log(this.total);
      }
      this.totalflag = !this.totalflag;
  }
  onSubmit(f: NgForm) {
    // alert(this.model.cardNumber);
    // alert(this.model.month);
    // alert(this.model.year);
    this.model.amount = this.total;
    this.obj2.add_payment(this.model.cardNumber, this.model.expirationdate, this.model.cardcod, this.model.amount).subscribe();
    console.log(this.model.cardNumber, this.model.expirationdate, this.model.cardcod, this.model.amount);
  }


  removeFromCart(index, course_id) {
    console.log(index);
    console.log(course_id);
    swal({
      title: 'Are you sure you want to remove this course from cart? <br> You will not be able to revert this!',
      type: 'question',
      showCancelButton: true,
      width: '512px',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.value) {
        this.obj2.removeFromCart(course_id).subscribe(
          data => {
            console.log(data);
            console.log('index' + index);
            this.GlobalCartCourses.splice(this.GlobalCartCourses.indexOf(this.GlobalCartCourses[index]),1);
            console.log(this.GlobalCartCourses);
            this.seeTotal();
            CourseCheckoutComponent.removeFromCartSuccess();
          },
          error => {
            // console.log(error);
            CourseCheckoutComponent.removeFromCartError();
          }
        );
      }
    })
  }


  static removeFromCartSuccess() {
    swal({
      type: 'success',
      title: 'Course Removed From Cart Successfully',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  static removeFromCartError() {
    swal({
      type: 'error',
      title: 'Oops <br> Failed to remove from cart!',
      // text: 'Failed to approve course!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

}
