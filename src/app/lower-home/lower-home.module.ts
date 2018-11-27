import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {LowerHomeComponent} from "./lower-home.component";
import {EditHomeCoursesEventsSectionComponent} from "./lower-home.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatInputModule} from '@angular/material';
import { MatDialogModule } from '@angular/material';
import {CategoriesModule} from '../categories/categories.module'
import {LoaderModule} from "../loader/loader.module";

const lowerHomeRoutes: Routes = [
  // { path: '', component: LowerHomeComponent }
];


@NgModule({
  declarations: [
    LowerHomeComponent,
    EditHomeCoursesEventsSectionComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    RouterModule.forChild(lowerHomeRoutes),
    LoaderModule
    // CategoriesModule
  ],

  providers: [],
  exports: [LowerHomeComponent, EditHomeCoursesEventsSectionComponent],
  entryComponents: [
    EditHomeCoursesEventsSectionComponent,
  ],

})

export class LowerHomeModule {

}

