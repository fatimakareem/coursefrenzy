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

  form = new FormGroup({
    cardnumber: new FormControl('', [
      Validators.minLength(16),
      Validators.maxLength(16),
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    ccv: new FormControl('', [
      Validators.minLength(4),
      Validators.maxLength(4),
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    expirydate: new FormControl('', [
      Validators.required,
      Validators.pattern('(0[1-9]|10|11|12)/20[0-9]{2}$')
    ]),
    cardnickname: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.required
    ]),
    check: new FormControl(),
  });

  updateForm = new FormGroup({
    // cardnumber2: new FormControl('', [
    //   Validators.minLength(16),
    //   Validators.maxLength(16),
    //   Validators.required,
    //   Validators.pattern('^[0-9]*$')
    // ]),
    ccv2: new FormControl('', [
      Validators.minLength(4),
      Validators.maxLength(4),
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    expirydate2: new FormControl('', [
      Validators.required,
      Validators.pattern('(0[1-9]|10|11|12)/20[0-9]{2}$')
    ]),
    cardnickname2: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.required
    ]),
    check2: new FormControl(),
  });

  private productsSource;
  currentProducts;
  private sub: Subscription;
  flipclass = 'credit-card-box';
  constructor(private serv: PaymentmethodsService, private router: Router, private route: ActivatedRoute, private sg: SimpleGlobal, private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {

  }

  ngOnInit() {
    this.form.controls['check'].setValue(false);
    this.getCards();
  }

  cardid;
  card;
  getSingleCard(id) {
    this.serv.singleCard(id).subscribe(Data => {
      this.card = Data;
      let expDate = this.card.expiryDate;
      expDate = expDate.substring(0, expDate.length - 3);
      expDate = moment(expDate).format('MM/YYYY');

      this.cardid = this.card.id;
      this.updateForm.controls['cardnickname2'].setValue(this.card.nickname);
      this.updateForm.controls['expirydate2'].setValue(expDate);
      this.updateForm.controls['check2'].setValue(this.card.default);
      this.updateForm.controls['ccv2'].setValue(this.card.ccv);
      this.updateForm.controls['cardnumber2'].setValue(this.card.cardNumber);
    })
  }

  updateSingleCard(id) {
    console.log('dasd',this.cardid);
    // this.date = this.updateForm.value['expirydate2'];
    this.date = moment(this.date).format('YYYY-MM') + '-01';

    if (this.updateForm.valid) {
      this.serv.updateCard(this.updateForm.value['ccv2'], this.date, this.updateForm.value['cardnickname2'], this.updateForm.value['check2'], id).subscribe(Data => {
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
    if (this.form.valid) {
      this.date = moment(this.date).format('YYYY-MM') + '-01';
      // this.date = this.form.value['expirydate'];


      this.serv.addCard(this.form.value['cardnumber'], this.form.value['ccv'], this.date, this.form.value['cardnickname'], this.form.value['check']).subscribe(Data => {

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
          if (error.status == 404) {
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
