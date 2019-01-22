import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from "./home.component";
import {HomeSliderEidtDialogComponent} from "./home.component";
import {CommonModule} from "@angular/common";
import {LowerHomeModule} from "../lower-home/lower-home.module";
// import {PopularCoursesModule} from "../popular-courses/popular-courses.module";
import {UpperHomeModule} from '../upper-home/upper-home.module';
// import {HomeSliderModule} from "../home-slider/home-slider.module";
// import {RecentlyViewedCoursesModule} from "../courses-all/recently-viewed-courses/recently-viewed-courses.module";
// import {RecommendedCoursesModule} from "../courses-all/recommended-courses/recommended-courses.module";
// import {CoursesOnBidModule} from "../courses-all/courses-on-bid/courses-on-bid.module";
// import {LoaderModule} from "../loader/loader.module";
// import {TrendingNowCoursesModule} from "../courses-all/trending-now-courses/trending-now-courses.module";
// import {TopRatedCoursesModule} from "../courses-all/top-rated-courses/top-rated-courses.module";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatIconModule} from '@angular/material';
// import {BiddingDialogModule} from "../bidding-dialog/bidding-dialog.module";
import {RatingModule} from "ng2-rating";

// import {HomeSliderComponent} from "./home-slider.component";
import { MatDialogModule } from '@angular/material';
import {MatInputModule} from '@angular/material';
import { SlickModule } from 'ngx-slick';

const homeRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '', component: HomeComponent}
];


@NgModule({
  declarations: [
    HomeComponent,
    HomeSliderEidtDialogComponent 
  ],

  imports: [
    RouterModule.forChild(homeRoutes),
    CommonModule,
    // HomeSliderModule,
    LowerHomeModule,
    UpperHomeModule,
    // PopularCoursesModule,
    // RecentlyViewedCoursesModule,
    // RecommendedCoursesModule,
    // CoursesOnBidModule,
    // LoaderModule,
    // TrendingNowCoursesModule,
    // TopRatedCoursesModule,
    RatingModule,MatDialogModule
    ,MatInputModule,
    SlickModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    // BiddingDialogModule,
  ],
  providers: [],
  exports: [HomeSliderEidtDialogComponent],
  entryComponents: [
    HomeSliderEidtDialogComponent
  ]

})

export class HomeModule {

}

