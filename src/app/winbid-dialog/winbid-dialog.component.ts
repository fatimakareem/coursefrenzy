import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import { WinbidUserComponent } from '../winbid-user/winbid-user.component';
import {HeaderService} from '../header/header.service';
import {FormGroup, FormBuilder, Validators, NgForm, FormControl} from '@angular/forms';
import { PaymentmethodsService } from '../paymentmethods/paymentmethods.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-winbid-dialog',
  templateUrl: './winbid-dialog.component.html',
  styleUrls: ['./winbid-dialog.component.scss']
})
export class WinbidDialogComponent implements OnInit {

  constructor(private obj_payment_service:PaymentmethodsService,public dialogRef: MatDialogRef<WinbidUserComponent>, @Inject(MAT_DIALOG_DATA) public data: any,public obj:HeaderService) { }
  CCV: FormGroup;
  CardNumber = '^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$';
  ExpiryDate= '([0-9]{2}[/]?){2}';

  ExpiryDateForm = new FormControl('', [
    Validators.required,
    Validators.pattern('(0[1-9]|10|11|12)/20[0-9]{2}$'),
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
  ngOnInit() {
    this.show_Card_info();
  }
  res;
  status;
  public model: any = {};
  var_get_status;var_get_id;
  show_Card_info()
{
return this.obj_payment_service.showCards().subscribe(Response =>{
    this.res=Response;
    console.log(this.res,'hhhhhhhhhhh')
    for(let i of this.res)
    { if (i.default) {
            this.status = i;
          }   
    }
    if (this.status) {
          this.model.cardNumber  = this.status.cardNumber;
          this.model.expirationdate= this.status.expiryDate;
          this.model.cardcod = this.status.ccv;
          this.var_get_status=this.status.default;
          this.var_get_id=this.status.id;
        }
  })
}
  onSubmit(f: NgForm) {
    // this.model.amount = this.total; cardNumber, expirationdate, cardcod,id,bid_id,status
    this.obj.winbidpayment(this.model.cardNumber, this.model.expirationdate, this.model.cardcod,this.var_get_id,this.data.course_id,this.var_get_status).subscribe();
    console.log(this.model.cardNumber, this.model.expirationdate, this.model.cardcod,this.var_get_id,this.data.course_id,this.var_get_status);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
 
}
