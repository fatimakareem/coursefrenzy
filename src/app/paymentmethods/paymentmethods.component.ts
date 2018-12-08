import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { PaymentmethodsService } from './paymentmethods.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

@Component({
  selector: 'app-paymentmethods',
  templateUrl: './paymentmethods.component.html',
  styleUrls: ['./paymentmethods.component.scss']
})
export class PaymentmethodsComponent implements OnInit {
  public mask = [/[0-9]/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  var_type_atm = new FormControl();
  edit_var_type_atm = new FormControl();
  cardtype;
  var_get_edit_card_type;
  public show: boolean = false;
  check_value: boolean = false;
  ccv1: boolean = false;
  ccv4;
  ccv;
  edit_ccv2;
  cardnumber4;
  cardnumber;
  var_box_check: boolean = false;
  destroy_value;
  card_opeation = [
    { value: 'Visa', viewValue: 'Visa' },
    { value: 'Master', viewValue: 'Master' },
    { value: 'Divcover', viewValue: 'Divcover' },
    { value: 'American Express', viewValue: 'American Express' }
  ];
  form = new FormGroup({
    cardnumber: new FormControl('', [
      Validators.minLength(16),
      Validators.maxLength(16),
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    cardnumber4: new FormControl('', [
      Validators.minLength(15),
      Validators.maxLength(15),
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    ccv: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(3),
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    ccv4: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4),
      Validators.pattern('^[0-9]*$')
    ]),
    expirydate: new FormControl('', [
      Validators.required,
      Validators.pattern('(0[1-9]|10|11|12)/20[0-9]{2}$')
    ]),
    cardnickname: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(14),
      Validators.pattern('^[a-zA-Z _.]+$'),
      Validators.required
    ]),
    // var_type_atm: new FormControl('', [
    //   Validators.required,
    // ]),
    check: new FormControl(),
  });

  updateForm = new FormGroup({
    cardnickname2: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(14),
      Validators.required
    ]),
    check2: new FormControl(),
  });

  private productsSource;
  currentProducts;
  private sub: Subscription;
  flipclass = 'credit-card-box';
  edit_cardnumber;
  edit_cardnumber2;
  edit_ccv3;
  constructor(private serv: PaymentmethodsService, private router: Router, private route: ActivatedRoute, private sg: SimpleGlobal, private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    this.cardnumber = true;
    this.cardnumber4 = false;
    this.ccv = true;
    this.ccv4 = false;
    // this.edit_cardnumber = false;
    // this.edit_cardnumber2 = false;
    // this.edit_ccv2 = false;
    // this.edit_ccv3 = false;
  }

  ngOnInit() {
    this.form.controls['check'].setValue(false);
    this.getCards();
  }
  ShowButton(var_type_atm) {

    if (var_type_atm == "American Express") {
      this.cardtype = var_type_atm;
      this.cardnumber = false;
      this.form.controls.cardnumber.reset();
      this.cardnumber4 = true;
      this.ccv = false;
      this.form.controls.ccv.reset();
      this.ccv4 = true;
    }
    else {
      this.cardtype = var_type_atm;
      this.cardnumber4 = false;
      this.form.controls.cardnumber4.reset();
      this.cardnumber = true;
      this.ccv4 = false;
      this.form.controls.ccv4.reset();
      this.ccv = true;
    }
  }
  cardid;
  card;
  var_get_type;
  check_defalut=false;
  getSingleCard(id,var_edit_card_name,var_edit_defalut) {
    this.cardid=id;
    this.updateForm.controls['cardnickname2'].setValue(var_edit_card_name);
    if(var_edit_defalut==true)
    {
      this.check_defalut=true;
      this.updateForm.controls['check2'].setValue(var_edit_defalut);
    }
    else
    {
      this.check_defalut=false;
      this.updateForm.controls['check2'].setValue(var_edit_defalut);
    }
  }
  updateSingleCard(id) {
      if (this.updateForm.controls.cardnickname2.valid) {
        this.serv.updateCard(this.updateForm.value['cardnickname2'],this.updateForm.value['check2'], id).subscribe(Data => {
          swal({
            type: 'success',
            title: 'Credit card details are updated!',
            showConfirmButton: false,
            timer: 1500
          })
          this.getCards();

        },
          error => {
            if (error.status == 400) {
              swal({
                type: 'error',
                title: 'Credit card details are not correct!',
                showConfirmButton: false,
                timer: 1500
              })
            }
            else if (error.status == 500) {
              swal(
                'Sorry',
                'Server is under maintenance!',
                'error'
              )
            }
            else {
              swal(
                'Sorry',
                'Some thing went worrng!',
                'error'
              )
            }
          })
      }
      else {
        swal({
          type: 'error',
          title: 'Credit card details are not correct!',
          showConfirmButton: false,
          timer: 1500
        })
      }
  }

  deleteSingleCard(id) {
    this.serv.deleteCard(id).subscribe(Data => {
      swal({
        type: 'success',
        title: 'Credit card is deleted!',
        showConfirmButton: false,
        timer: 1500
      })
      this.getCards();
    },
      error => {
        if (error.status == 204) {
          swal({
            type: 'error',
            title: 'No credit card found!',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else if (error.status == 500) {
          swal(
            'Sorry',
            'Server is under maintenance!',
            'error'
          )
        }
        else {
          swal(
            'Sorry',
            'Some thing went worrng!',
            'error'
          )
        }
      })
  }

  date;
  add() {
    if (this.cardtype == "American Express") {
      if (this.form.controls.cardnumber4.valid && this.form.controls.ccv4.valid &&
        this.form.controls.cardnickname.valid && this.form.controls.expirydate.valid) {
        // this.date = moment(this.date).format('YYYY-MM') + '-01';
        this.date = this.form.value['expirydate'];
        this.serv.addCard(this.form.value['cardnumber4'], this.form.value['ccv4'], this.date, this.form.value['cardnickname'], this.cardtype, this.form.value['check']).subscribe(Data => {

          console.log('Date Exp', this.date);
          swal({
            type: 'success',
            title: 'Payment method is listed!',
            showConfirmButton: false,
            timer: 1500
          })
          this.getCards();
        },
          error => {
           if (error.status == 302) {
              swal(
                'Sorry',
                'Crad Number Already Exist',
                'error'
                
              )
            }
         
            else if (error.status == 404) {
              swal({
                type: 'error',
                title: 'This card already exist!',
                showConfirmButton: false,
                timer: 1500
              })
            }
            else if (error.status == 400) {
              swal({
                type: 'error',
                title: 'Please enter correct details!',
                showConfirmButton: false,
                timer: 1500
              })
            }
            else if (error.status == 500) {
              swal(
                'Sorry',
                'Server is under maintenance!',
                'error',
                
              )
            }
         
            else {
              swal(
                'Sorry',
                'Some thing went worrng!',
                'error'
              )
            }
          })
      }
      else {
        swal({
          type: 'error',
          title: 'Please enter correct details!',
          showConfirmButton: false,
          timer: 1500,
        })
      }
    }
    else {

      if (this.form.controls.cardnumber.valid && this.form.controls.ccv.valid &&
        this.form.controls.cardnickname.valid && this.form.controls.expirydate.valid) {

        this.date = this.form.value['expirydate'];
        // this.date = moment(this.date).format('YYYY-MM') + '-01';

        this.serv.addCard(this.form.value['cardnumber'], this.form.value['ccv'], this.date, this.form.value['cardnickname'], this.cardtype, this.form.value['check']).subscribe(Data => {

          console.log('Date Exp', this.date);
          swal({
            type: 'success',
            title: 'Payment method is listed!',
            showConfirmButton: false,
            timer: 1500
          })
          this.getCards();
        },
          error => {
            if (error.status == 302) {
              swal(
                'Sorry',
                'Crad Number Already Exist',
                'error'
                
              )
            }
            else if (error.status == 404) {
              swal({
                type: 'error',
                title: 'This card already exist!',
                showConfirmButton: false,
                timer: 1500
              })
            }
            else if (error.status == 400) {
              swal({
                type: 'error',
                title: 'Please enter correct details!',
                showConfirmButton: false,
                timer: 1500
              })
            }
            else if (error.status == 500) {
              swal(
                'Sorry',
                'Server is under maintenance!',
                'error'
              )
            }
            else {
              swal(
                'Sorry',
                'Some thing went worrng!',
                'error'
              )
            }
          })
      }
      else {
        swal({
          type: 'error',
          title: 'Please enter correct details!',
          showConfirmButton: false,
          timer: 1500,
        })
      }
    }
  }
  res;
  getCards() {
    this.serv.showCards().subscribe(Data => {
      this.res = Data;
    },
      error => {
        if (error.status == 404) {
          swal({
            type: 'error',
            title: 'Credit card not found!',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else if (error.status == 500) {
          swal(
            'Sorry',
            'Server is under maintenance!',
            'error'
          )
        }
      })
  }
}
