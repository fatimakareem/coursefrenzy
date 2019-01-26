import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, NgForm, FormControl} from '@angular/forms';
import {UploadCoursesService} from '../upload-courses/upload-courses.service';
import {Config} from '../Config';
import {CourseCheckoutService} from "./course-checkout.service";
import {GlobalService} from "../global.service";
import swal from 'sweetalert2';
import { PaymentmethodsService } from '../paymentmethods/paymentmethods.service';
import { Response } from '@angular/http';
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
  var_get_status;
  var_get_id;
  CCV: FormGroup;
  card_opeation=[
    {value: 'Visa', viewValue: 'Visa Card'},
    {value: 'Mastercard', viewValue: 'Master Card'},
    {value: 'American Express', viewValue: 'American Express'},
    {value: 'Discover', viewValue: 'Discover'}
    
    ];
  CardNumber = '^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$';
  ExpiryDate= '([0-9]{2}[/]?){2}';
  
  ExpiryDateForm = new FormControl('', [
    Validators.required,
    Validators.pattern('(0[1-9]|10|11|12)/[0-9]{2}$'),
  ]);

  CardNumberForm = new FormControl('', [
    Validators.required,
  ]);

  CardCodeForm = new FormControl('', [
    Validators.required,
  
  ]);
  Holdername = new FormControl('', [
    Validators.required
  ]);
  CardtypeForm = new FormControl('', [
    Validators.required,
    
  ]);
  Carddefault = new FormControl('', [
   
    
  ]);
  // TotalAmountForm = new FormControl('', [
  //   Validators.required
  // ]);
  expirydate;
  chek(val){
    // this.expirydate=val.toString().slice(3,7);
    this.expirydate=val.toString().slice(3,5);
    console.log(this.expirydate,'jj')
  }
  public mask=function(rawValue) {
   
    // add logic to generate your mask array  
    if (rawValue && rawValue.length > 0) {
        if (rawValue[0] == '0' || rawValue[5] == '1') {
            return [/[01]/, /[1-9]/, '/',  /[0-9]/, /[0123456789]/];
        } else {
            return [/[01]/, /[0-2]/, '/',  /[0-9]/, /[0123456789]/];
        }
    }
    return [/[01]/, /[0-9]/, '/',  /[0-9]/, /[0123456789]/];
    
}
  endRequest ;
  public ccvmask =[/[0-9]/, /\d/, /\d/];
  public cardmask =[/[0-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  // import("c:/Users/Brain Plow/Documents/GitHub/coursefrenzy/node_modules/rxjs/Subscription").Subscription;

  constructor(private obj: UploadCoursesService,private obj_payment_service:PaymentmethodsService, private obj2: CourseCheckoutService, private global: GlobalService, private formBuilder: FormBuilder ) {
   
    this.global.GlobalCartCourses$.subscribe(
      data => {
        if(data.length===0){
          this.GlobalCartCourses = [];
        }else{
          this.GlobalCartCourses = data;
          this.totalcarts=data.totalItems;
          this.seeTotal();
        }

      });

    this.global.emptyCartGlobal$.subscribe(
      data => {
        this.emptyCart = data;
        // alert(this.emptyCart);
      });

  }
  totalcarts;
  ShowButton(var_type_atm) {
    // this.cardtype = var_type_atm;
    if (var_type_atm == "American Express") {
     this.cardmask = [/[3]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]
     this.ccvmask=[/[0-9]/, /\d/, /\d/,/\d/]
    }
    else if (var_type_atm == "Visa") {
     this.cardmask=[/[4]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
     this.ccvmask=[/[0-9]/, /\d/, /\d/]
    }
    else if (var_type_atm == "Mastercard") {
      this.cardmask=[/[5]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      this.ccvmask=[/[0-9]/, /\d/, /\d/]
     } else{
      this.cardmask=[/[6]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      this.ccvmask=[/[0-9]/, /\d/, /\d/]
     }
  }
 
  getcart(){
    
      // alert('calling Checkout Courses');
      this.obj2.get_checkout_courses().subscribe(response => {
        if(response.hasOwnProperty("status")) {
          this.emptyCart = response.status;
          this.GlobalCartCourses = [];

          // alert('Checkout Courses are Empty')
        }
        else {
          this.GlobalCartCourses = response;
          this.totalcarts=response.totalItems
          this.global.getGolbalCartCourses(this.GlobalCartCourses);
          this.emptyCart = false;
        }
      });
    
  }
  ngOnInit() {
    // this.obj2.get_checkout_courses().subscribe(response => {
    //   this.GlobalCartCourses = response;
    //   this.totalcarts=response.totalItems;
    //   console.log('Checkout'+this.GlobalCartCourses);
    //   this.global.getGolbalCartCourses(this.GlobalCartCourses);
    
    //   this.loaded = true;
    // });
    // this.show_Card_info();
    if(this.GlobalCartCourses.length > 0) {
      this.emptyCart = false;
    }
    return this.obj_payment_service.showCards().subscribe(Response =>{
          this.res=Response;
    })
  }

  seeTotal(){
      this.total = 0;
      for(let list of this.GlobalCartCourses.courses) {
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
            this.getcart();
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
  status;
  res;

updefault;
hide:boolean=true;
set_default:boolean=false;
Add_new(){
  alert(this.set_default)
if(this.set_default==true){
  this.hide=true;
}else if(this.set_default==false){
this.hide=false;

}
}
onSubmit() {
  if(this.model.cardNumber){
    this.obj2.add_payment(this.model.cardNumber.split('-').join(''), this.model.expirationdate.split('/').join(''), this.model.cardcod, this.model.amount,this.var_get_id,this.var_get_status,this.model.cardtype,this.model.holdername).subscribe();
    console.log(this.model.cardNumber, this.model.expirationdate, this.model.cardcod, this.model.amount,this.var_get_id,this.var_get_status);
  }else if(this.model.defaultcard){
    this.obj2.add_payment(this.model.defaultcard.split('-').join(''), this.model.expirationdate.split('/').join(''), this.model.cardcod, this.model.amount,this.var_get_id,this.var_get_status,this.model.cardtype,this.model.holdername).subscribe();
    console.log(this.model.cardNumber, this.model.expirationdate, this.model.cardcod, this.model.amount,this.var_get_id,this.var_get_status);
  }
 
}


}
