import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoursesOnBidModule} from '../courses-all/courses-on-bid/courses-on-bid.module';
import {TrendingNowCoursesModule} from '../courses-all/trending-now-courses/trending-now-courses.module';
import {TopRatedCoursesModule} from '../courses-all/top-rated-courses/top-rated-courses.module';
import {SubCategoryCoursesComponent} from './sub-category-courses.component';
import {SubcatTrendingNowCoursesComponent} from './subcat-trending-now-courses/subcat-trending-now-courses.component';
import {SubcatTopRatedCoursesComponent} from './subcat-top-rated-courses/subcat-top-rated-courses.component';
import {SubcatRecommendedCoursesComponent} from './subcat-recommended-courses/subcat-recommended-courses.component';
import {SubcatBidCoursesComponent} from './subcat-bid-courses/subcat-bid-courses.component';


const subcategoryCoursesRoutes: Routes = [
  { path: '', component: SubCategoryCoursesComponent }
];


@NgModule({
  declarations: [
    SubCategoryCoursesComponent,
    SubcatBidCoursesComponent,
    SubcatTrendingNowCoursesComponent,
    SubcatTopRatedCoursesComponent,
    SubcatRecommendedCoursesComponent

  ],

  imports: [
    CommonModule,
    RouterModule.forChild(subcategoryCoursesRoutes),
    CoursesOnBidModule,
    TrendingNowCoursesModule,
    TopRatedCoursesModule
  ],

  providers: [],
  exports: [],
  entryComponents: [
  ]

})

export class SubCategoryCoursesModule {

}

