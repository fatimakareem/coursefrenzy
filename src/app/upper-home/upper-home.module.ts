import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {EditUpperhome2DialogComponent, UpperHomeComponent} from "./upper-home.component";
import {BenefitsModule} from "../benefits/benefits.module";
import {EditUpperhometDialogComponent} from "./upper-home.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatInputModule} from '@angular/material';
import { MatDialogModule } from '@angular/material';
import {LoaderModule} from "../loader/loader.module";

const upperHomeRoutes: Routes = [

];


@NgModule({
  declarations: [
    UpperHomeComponent,
    EditUpperhometDialogComponent,
    EditUpperhome2DialogComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    RouterModule.forChild(upperHomeRoutes),
    BenefitsModule,
    LoaderModule
  ],

  providers: [],
  exports: [UpperHomeComponent, EditUpperhometDialogComponent, EditUpperhome2DialogComponent],
  entryComponents: [
    EditUpperhometDialogComponent,
    EditUpperhome2DialogComponent
  ]

})

export class UpperHomeModule {

}

