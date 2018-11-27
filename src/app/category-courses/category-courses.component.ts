import { Component, OnInit } from '@angular/core';
import {HeaderService} from "../header/header.service";
import {Config} from "../Config";
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalService} from "../global.service";


declare const $: any;

@Component({
  selector: 'app-category-courses',
  templateUrl: './category-courses.component.html',
  styleUrls: ['./category-courses.component.scss']
})
export class CategoryCoursesComponent implements OnInit {

  public sub_categories: any=[];
  public catImageUrl = Config.staticStorageImages;
  public loaded_subcategory: boolean  = false;
  public category_id: any;
  private category: any;

  constructor(private obj2: HeaderService,
              private route: ActivatedRoute,
              private global: GlobalService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.category_id = +params['cat_id'] || 1;
      //Geting Category Data
      this.obj2.get_single_category(this.category_id).subscribe(response=>{
        this.category = response;
        this.global.setCatName(this.category);
      });
    });


  }


}
