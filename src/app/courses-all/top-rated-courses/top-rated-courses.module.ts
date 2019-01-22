import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatInputModule} from '@angular/material';
import { MatDialogModule } from '@angular/material';
// import {BiddingDialogModule} from '../../bidding-dialog/bidding-dialog.module';
import {TopRatedCoursesComponent} from "./top-rated-courses.component";
import {AddCartDialogModule} from "../../cart-dialog/add-cart-dialog.module";
import {LoaderModule} from "../../loader/loader.module";
// import {NgbModule, NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import {RatingModule} from "ng2-rating";
import {SlickModule} from 'ngx-slick';

const recentlyViewedCoursesRoutes: Routes = [ ];

@NgModule({
  declarations: [
    TopRatedCoursesComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    // BiddingDialogModule,
    AddCartDialogModule,
    RouterModule.forChild(recentlyViewedCoursesRoutes),
    LoaderModule,
    RatingModule,
    SlickModule
    // NgbModule
  ],

  providers: [],
  exports: [TopRatedCoursesComponent],
  entryComponents: [
  ]

})

export class TopRatedCoursesModule {

}

