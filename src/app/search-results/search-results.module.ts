import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import { SearchResultsComponent } from './search-results.component';


const searchresultsRoutes: Routes = [
  { path: '', component: SearchResultsComponent }
];


@NgModule({
  declarations: [
    SearchResultsComponent,
  ],

  imports: [
    CommonModule,
    RouterModule.forChild(searchresultsRoutes),
  ],

  providers: [],
  exports: []

})

export class SearchresultsModule {

}

