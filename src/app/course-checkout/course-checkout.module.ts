import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CourseCheckoutComponent} from "./course-checkout.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatInputModule} from '@angular/material';
import {LoaderModule} from "../loader/loader.module";
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
const checkoutRoutes: Routes = [
  { path: '', component: CourseCheckoutComponent }
];


@NgModule({
  declarations: [
    CourseCheckoutComponent,

  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    RouterModule.forChild(checkoutRoutes),
    LoaderModule,
    MatDatepickerModule,
  ],

  providers: [],
  exports: [],
  entryComponents: []

})

export class CourseCheckoutModule {

}

