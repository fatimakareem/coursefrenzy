import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatInputModule} from '@angular/material';
import {BuyNowDialogComponent} from "./buy-now-dialog.component";
import {LoaderModule} from "../loader/loader.module";

const cartRoutes: Routes = [ ];


@NgModule({
  declarations: [
    BuyNowDialogComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    RouterModule.forChild(cartRoutes),
    LoaderModule

  ],

  providers: [],
  exports: [BuyNowDialogComponent],
  entryComponents: [
    BuyNowDialogComponent
  ]

})

export class BuyNowDialogModule {

}

