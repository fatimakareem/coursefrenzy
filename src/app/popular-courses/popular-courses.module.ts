import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {EditHomeCoursesContentComponent, PopularCoursesComponent} from "./popular-courses.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatInputModule} from '@angular/material';
import { MatDialogModule } from '@angular/material';
// import {CoursesOnBidModule} from '../courses-all/courses-on-bid/courses-on-bid.module'
import {AddCartDialogModule} from "../cart-dialog/add-cart-dialog.module";
// import {BiddingDialogModule} from '../bidding-dialog/bidding-dialog.module';
import {LoaderModule} from "../loader/loader.module";

const popularCoursesRoutes: Routes = [
];


@NgModule({
  declarations: [
    PopularCoursesComponent,
    EditHomeCoursesContentComponent
  ],

  imports: [
    CommonModule,
    RouterModule.forChild(popularCoursesRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    // BiddingDialogModule,
    // CoursesOnBidModule,
    AddCartDialogModule,
    LoaderModule
  ],

  providers: [],
  exports: [PopularCoursesComponent, EditHomeCoursesContentComponent],
  entryComponents: [
    EditHomeCoursesContentComponent
  ]

})

export class PopularCoursesModule {

}

