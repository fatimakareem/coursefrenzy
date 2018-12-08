import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
// import {HomeSliderComponent} from "./home-slider.component";
import { MatDialogModule } from '@angular/material';
import { HomeSliderEidtDialogComponent } from './home-slider.component';
import {MatInputModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {LoaderModule} from "../loader/loader.module";
import { SlickModule } from 'ngx-slick';

const homeSliderRoutes: Routes = [
  // { path: 'courses', component: HomeSliderComponent }
];


@NgModule({
  declarations: [
    // HomeSliderComponent,
    HomeSliderEidtDialogComponent,
  ],

  imports: [
    CommonModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(homeSliderRoutes),
    LoaderModule,
    SlickModule
  ],

  providers: [],
  exports: [HomeSliderEidtDialogComponent],
  entryComponents: [
    HomeSliderEidtDialogComponent,
  ],

})

export class HomeSliderModule {

}

