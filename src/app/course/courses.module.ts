import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule, CurrencyPipe} from "@angular/common";
import {CourseComponent} from "./course.component";
import {MatDialogModule} from '@angular/material';
// import {BiddingDialogModule} from '../bidding-dialog/bidding-dialog.module';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatInputModule} from '@angular/material';
import { MatSelectModule } from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {RecommendedCoursesModule} from "../courses-all/recommended-courses/recommended-courses.module";
import {RecentlyViewedCoursesModule} from "../courses-all/recently-viewed-courses/recently-viewed-courses.module";
import {AddCartDialogModule} from "../cart-dialog/add-cart-dialog.module";
// import {CoursesOnBidModule} from "../courses-on-bid/courses-on-bid.module";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material';
import {LoaderModule} from "../loader/loader.module";
import {CoursesOnBidModule} from "../courses-all/courses-on-bid/courses-on-bid.module";
import {TopRatedCoursesModule} from "../courses-all/top-rated-courses/top-rated-courses.module";
import {TrendingNowCoursesModule} from "../courses-all/trending-now-courses/trending-now-courses.module";
import {WatchedCoursesComponent} from "../watched-courses/watched-courses.component";
import {WatchedCoursesModule} from "../watched-courses/watched-courses.module";
import { SlickModule } from 'ngx-slick';
import {RatingModule} from "ng2-rating";

const coursesRoutes: Routes = [
  { path: '', component: CourseComponent },
  // { path: 'courses/:query', component: CourseComponent },
  // { path: 'courses/sub/:query2', component: CourseComponent },
];


@NgModule({
  declarations: [
    CourseComponent
  ],

  imports: [
    CommonModule,RatingModule,
    // BiddingDialogModule,
    AddCartDialogModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    // RecommendedCoursesModule,
    MatAutocompleteModule,
    // RecentlyViewedCoursesModule,
    // WatchedCoursesModule,
    MatButtonModule,
    // CoursesOnBidModule,
    RouterModule.forChild(coursesRoutes),
    // CoursesOnBidModule,
    LoaderModule,
    // TrendingNowCoursesModule,
    // TopRatedCoursesModule,
    SlickModule.forRoot()
  ],

  providers: [CurrencyPipe],
  exports: []
})
export class CoursesModule {

}

