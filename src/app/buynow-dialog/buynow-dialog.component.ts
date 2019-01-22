import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import { WinbidUserComponent } from '../winbid-user/winbid-user.component';
import {HeaderService} from '../header/header.service';
import {FormGroup, FormBuilder, Validators, NgForm, FormControl} from '@angular/forms';
import { PaymentmethodsService } from '../paymentmethods/paymentmethods.service';
import {Subscription} from 'rxjs/Subscription';
import swal from 'sweetalert2'
@Component({
  selector: 'app-buynow-dialog',
  templateUrl: './buynow-dialog.component.html',
  styleUrls: ['./buynow-dialog.component.scss']
})
export class BuynowDialogComponent implements OnInit {
  constructor(private obj_payment_service:PaymentmethodsService,public dialogRef: MatDialogRef<WinbidUserComponent>, @Inject(MAT_DIALOG_DATA) public data: any,public obj:HeaderService) { }
  CCV: FormGroup;
  CardNumber = '^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$';
  ExpiryDate= '([0-9]{2}[/]?){2}';

  ExpiryDateForm = new FormControl('', [
    Validators.required,
    Validators.pattern('(0[1-9]|10|11|12)/[0-9]{2}$'),
  ]);

  CardNumberForm = new FormControl('', [
    Validators.required,
    
  ]);
  CardtypeForm = new FormControl('', [
    Validators.required,
    
  ]);
  CardCodeForm = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(4)
  ]);
  Holdername = new FormControl('', [
    Validators.required
  ]);
  ngOnInit() {
    this.show_Card_info();
  }
  res;
  status;
  // cardtype;
  // holdername
  public model: any = {};
  var_get_status;var_get_id;
  card_opeation=[
    {value: 'Visa', viewValue: 'Visa Card'},
    {value: 'Mastercard', viewValue: 'Master Card'},
    {value: 'American Express', viewValue: 'American Express'},
    {value: 'Discover', viewValue: 'Discover'}
    
    ];
  show_Card_info()
{
return this.obj_payment_service.showCards().subscribe(Response =>{
    this.res=Response;
    console.log(this.res,'hhhhhhhhhhh')
    for(let i of this.res)
    { if (i.default == true) {
            this.status = i;
            this.model.cardNumber  = this.status.cardNumber;
            this.model.expirationdate= this.status.expiryDate;
            this.model.cardcod = this.status.ccv;
            this.var_get_status=this.status.default;
            this.var_get_id=this.status.id;
            this.model.cardtype=this.status.card_type;
            this.model.holdername=this.status.nickname;
          }  else {
            this.model.cardNumber  = '';
            this.model.expirationdate= '';
            this.model.cardcod = '';
            this.model.cardtype='';
            this.model.holdername='';
            // this.var_get_status=this.status.default;
            // this.var_get_id=this.status.id;
          }  
    }
   
  })
}
updefault;

setcard(name,status,var_get_card_id) {
  if (status == false) {
    this.updefault = true;
  }
  else if(status == true)
   {
    this.updefault = false;
  }
  this.obj_payment_service.updateCard(name,this.updefault,var_get_card_id).subscribe(Data => {
    swal({
      type: 'success',
      title: 'Credit Card Details Are Updated!',
      showConfirmButton: false,
      timer: 1500
    })
    this.show_Card_info();
  },
    error => {
      if (error.status == 400) {
        swal({
          type: 'error',
          title: 'Credit Card Details Are Not Correct!',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else if (error.status == 500) {
        swal(
          'Sorry',
          'Server Is Under Maintenance!',
          'error'
        )
      }
      else {
        swal(
          'Sorry',
          'Some Thing Went Worrng!',
          'error'
        )
      }
    })
}
  onSubmit(f: NgForm) {
   
    this.obj.coursepayment(this.model.cardNumber, this.model.expirationdate, this.model.cardcod,this.var_get_id,this.data.course_id,this.var_get_status,this.model.cardtype,this.model.holdername).subscribe();
    console.log(this.model.cardNumber, this.model.expirationdate, this.model.cardcod,this.var_get_id,this.data.course_id,this.var_get_status);
  
}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
