import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatInputModule} from '@angular/material';
import { MatDialogModule } from '@angular/material';
import {WatchedCoursesComponent} from "./watched-courses.component";
import {AddCartDialogModule} from "../cart-dialog/add-cart-dialog.module";
import {LoaderModule} from "../loader/loader.module";

const watchedCoursesRoutes: Routes = [
];


@NgModule({
  declarations: [
    WatchedCoursesComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    // BiddingDialogModule,
    AddCartDialogModule,
    RouterModule.forChild(watchedCoursesRoutes),
    LoaderModule
  ],

  providers: [],
  exports: [WatchedCoursesComponent],
  entryComponents: [
  ]

})

export class WatchedCoursesModule {

}

