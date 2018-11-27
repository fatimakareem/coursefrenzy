import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatInputModule} from '@angular/material';
import {AddCartDialogComponent} from "./add-cart-dialog.component";
import {LoaderModule} from "../loader/loader.module";
import {MatDialogModule} from '@angular/material/dialog';
const cartRoutes: Routes = [ ];


@NgModule({
  declarations: [
    AddCartDialogComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    RouterModule.forChild(cartRoutes),
    LoaderModule,
    MatDialogModule

  ],

  providers: [],
  exports: [AddCartDialogComponent],
  entryComponents: [
    AddCartDialogComponent
  ]

})

export class AddCartDialogModule {

}

