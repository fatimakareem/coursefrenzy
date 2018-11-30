import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {FormControl, NgForm, Validators} from '@angular/forms';
import {UploadCoursesService} from './upload-courses.service';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Config} from '../Config';
import swal from 'sweetalert2';
import {HeaderService} from '../header/header.service';
import {GlobalService} from '../global.service';
import {PagerService} from '../paginator.service';
import {HttpClient} from '@angular/common/http';
import {HomeService} from "../home/home.service";
import * as moment from 'moment';
import {Observable} from 'rxjs/Observable';
import {isPlatformBrowser} from '@angular/common';
const NAME_REGEX = '[a-zA-Z0-9_.]+?';
const NUMBER_REGEX = '[0-9]';

@Component({
  selector: 'app-upload-courses',
  templateUrl: './upload-courses.component.html',
  styleUrls: ['./upload-courses.component.css']
})
export class UploadCoursesComponent implements OnInit {
  course_data_passing: any;
  public NoPostedCourseErrorMessage: string;
  public coursesList: any = [];
  getingRoleData: any;
  public ImageUrl = Config.ImageUrl;
  p = 1;
  public userRole: string;
  public postedCoursesList: any = [];
  public loaded2: boolean = false;
  pager: any = {};
  public query: any;
  response;
  public searchResult: any;
  public NoMyCoursesErrorFalse: boolean= false;
  public NoMyCoursesErrorMessage: string;
  public  GlobalUploadCourses:any = [];
  public Logedin: string;
  public UploadCourses: any=[];
  constructor(private obj: UploadCoursesService, public dialog: MatDialog, private global: GlobalService,
              private pagerService: PagerService, private _home: HomeService, private global2: GlobalService, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.Logedin = localStorage.getItem("loged_in");
    }
    this.global2.caseNumber$.subscribe(
      data => {
        this.Logedin = data;
      });

    this.global.checkingUserRole$.subscribe(
      data => {
        this.userRole = data;
      });
    // this.global.GlobalUploadCourse$.subscribe(
    //   data => {
    //     if (data.length===0){
    //       this.GlobalUploadCourses = [];
    //     }else {
    //       this.GlobalUploadCourses = data;
    //     }
    //   });

  }

  ngOnInit() {

    // this.global.GlobalUploadCourse$.subscribe(response  => this.response  = response);
    this.obj.get_my_enrolled_courses().subscribe(response => {
      if(response.hasOwnProperty("status")) {
        // console.log("No Course Founddddd in My Enrolled Courses");
        console.log(response.status);
        this.NoMyCoursesErrorFalse = false;
        this.NoMyCoursesErrorMessage = response.message;

      }else {
        this.coursesList = response.courses;
        this.NoMyCoursesErrorFalse = true;
        console.log('printing My Courses List');
        // console.log(this.coursesList);
        this.loaded = true;
      }

    });

    this._home.get_role().subscribe(response => {
      this.getingRoleData = response;
      this.userRole = this.getingRoleData.Role;
      // alert('Home Role' + this.UserRole);
      this.global.checkUserRole(this.userRole);
      this.loaded = true;
    });

    this.setPage(1);
  }

  animal: string;
  name: string;
  loaded = false;

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCourseDialogComponent, {
      // width: '500px',
      data: this.postedCoursesList
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // console.log(result);
      window.location.reload();
      if(result !== 1) {
        this.postedCoursesList['courses'].push(result);
        console.log('hello worlds',this.postedCoursesList['courses']);
      }
    });
  }

  EditCourseDialog(index, course_id): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    this.course_data_passing = this.postedCoursesList;
    // dialogConfig
    dialogConfig.data = {
      width: '500px',
      course_data: this.course_data_passing['courses'][index],
      isEditForm: true
    };
    const dialogRef = this.dialog.open(EditCourseDialogComponent, dialogConfig);

    // const dialogRef = this.dialog.open(AddCourseDialogComponent, {
    //   width: '500px',
    //   data: this.postedCoursesList
    // });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      console.log(result);
      if(result !== 1) {
        // alert('updating all courses');
        this.postedCoursesList['courses'][index] = result;
        // console.log(this.postedCoursesList['courses']);
      }
    });
  }


  deletdeCourse(index, course_id) {
    // console.log(index);
    // console.log(course_id);
    swal({
      title: 'Are you sure you want to delete this course? <br> All Chapters and videos of this course will be deleted <br> You will not be able to revert this!',
      type: 'question',
      showCancelButton: true,
      width: '512px',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.obj.delete_my_posted_course(course_id).subscribe(
          data => {
            // console.log(data);
            // console.log('index' + index);
            this.postedCoursesList['courses'].splice(this.postedCoursesList['courses'].indexOf(this.postedCoursesList['courses'][index]),1);
            // console.log(this.postedCoursesList['courses']);
            UploadCoursesComponent.deleteSuccess();
          },
          error => {
            // console.log(error);
            UploadCoursesComponent.deleteError();
          }
        );
      }
    })
  }


  static deleteSuccess() {
    swal({
      type: 'success',
      title: 'Delete Request sent to admin',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  static deleteError() {
    swal({
      type: 'error',
      title: 'Oops! <br> Failed to send request',
      // text: 'Failed to approve course!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }


  filter(query) {
    if (this.query !== '') {
      this.obj.search_my_posted_course(this.query).subscribe(response => {
        this.postedCoursesList = response;
        // this.searchResult = response;
        // console.log(this.Courses);

        this.loaded = true;
      });
    }
  }



  openDialog2(BidCourse_id): void {
    const dialogRef = this.dialog.open(CourseBidComponent, {
      width: '500px',
      data: {BidCourse_id: BidCourse_id}
    });

  }


  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.obj.get_my_posted_courses(page).subscribe(response => {
      this.postedCoursesList = response;
      console.log('PostedCourse', this.postedCoursesList);
      if(response.hasOwnProperty("status")) {
        this.NoPostedCourseErrorMessage = response.message;
      }
      // console.log(this.postedCoursesList['courses']);
      this.pager = this.pagerService.getPager(this.postedCoursesList['totalItems'], page, 10);
      // console.log(this.postedCoursesList['totalItems']);
      this.loaded2 = true;
    });
  }

  setPage2(page: number) {
    // if (page < 1 || page > this.pager.totalPages) {
    //   return;
    // }
    // this.obj.get_my_posted_courses(page).subscribe(response => {
    //   this.postedCoursesList = response;
    //   // console.log(this.postedCoursesList.courses);
    //   this.pager = this.pagerService.getPager(this.postedCoursesList['totalItems'], page, 10);
    //   this.loaded2 = true;
    // });
  }

  onSelect(course) {
  }
}

@Component({
  selector: 'app-add-course--dialog',
  templateUrl: 'add-course-dialog.html',
  styleUrls: ['../events/add-event.component.css']
})
export class AddCourseDialogComponent implements OnInit {
  time = new Date("00:00:00 GMT-0500 (EST)");
  public course_image: string;
  public ImageUrl = Config.ImageUrl;
  private EditCourseData: any = [];
  public isEditForm: boolean = false;
  name: any;
  page: number;
  skill: string;
  public Categories;
  public SubCategories;
  public loaded = false;

  Auction = true;
  file: any;
  file1: any;
  files: File;
  input;
  Checks= true;
  clicked = false;
  public model: any = {};
  color = 'accent';
  checked = false;
  disabled = false;
  hide;
  isActive = true;
  isActives = true;
  isBidPrice = true;
  Check = false;
  Day= false;
  hides;
  isBids;
  duration = 0;
  Dic = 0;
  Sale = 0;
  Days= false;
  starttime;
  Date= new Date();
  Dates= new Date();
  Auct;
  Logedin: string;
  public GlobalUploadCourses: any = [];
  ranges = [
    {value: '10', viewValue: '10'},
    {value: '15', viewValue: '15'},
    {value: '21', viewValue: '21'},
    {value: '30', viewValue: '30'},
    {value: '60', viewValue: '60'}
  ];
  range = [
    {value: '3', viewValue: '3'},
    {value: '5', viewValue: '5'},
    {value: '7', viewValue: '7'},
    {value: '15', viewValue: '15'},
  ];
  end_time;
  Sales;
  response
  Name = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9_.+-, !@#$%^&*()<>{}|=~]+?')]);

  Price = new FormControl('', [
    Validators.required,
    Validators.pattern('NUMBER_REGEX')]);


  Discount = new FormControl('', [
    Validators.required, Validators.pattern('NUMBER_REGEX')]);

  DaysDuration = new FormControl('', [
    Validators.required]);

  SaleDuration = new FormControl('', [
    Validators.required
  ]);
  ReservedPrice = new FormControl('', [
    Validators.required,
    Validators.pattern('NUMBER_REGEX')]);

  SalePrice = new FormControl('', [
    Validators.required,
    Validators.pattern('NUMBER_REGEX')]);


  dateFormControl = new FormControl('', [
    Validators.required,
  ]);
  constructor(private obj: UploadCoursesService, private obj2: HeaderService, public dialogRef: MatDialogRef<AddCourseDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private global: GlobalService,@Inject(PLATFORM_ID) private platformId: Object) {
    if(data.course_data){
      this.EditCourseData = data.course_data;
      this.isEditForm = data.isEditForm;
      console.log('Edit Course Data',this.EditCourseData);
      console.log(this.isEditForm);
      // this.model = data.course_data;
      this.model.course_image = this.EditCourseData.course.course_image;
      this.model.Name = this.EditCourseData.course.name;
      console.log(this.model.Name);
      this.model.Price = this.EditCourseData.course.actual_price;
      // this.model.Discount = this.EditCourseData.discounted_price;
      this.Sales = this.EditCourseData.course.date_durationforsale;
      console.log('Sale_Duration',this.Sales);
      this.isActive = this.EditCourseData.course.sale_status;
      console.log('isActive', this.isActive);
      this.isActives = this.EditCourseData.course.accept_offer;
      console.log('isActives', this.isActives);
      this.isBidPrice = this.EditCourseData.course.bidstatus;
      console.log('isBidPrice',this.isBidPrice);
      this.model.SalePrice = this.EditCourseData.InitAmount;
      console.log('SalePrice', this.model.SalePrice);
      this.Date = this.EditCourseData.StartTime;
      console.log('Current Date', this.Date);
      this.end_time = this.EditCourseData.EndTime;
      console.log('end_time',this.end_time);
      this.Check = this.EditCourseData.isReserved;
      console.log('CHeck',this.Check);
      this.model.ReservedPrice = this.EditCourseData.reservedPrice;
      console.log('ReservedPrice', this.model.ReservedPrice);
      this.model.category = this.EditCourseData.course.Categories[0].id;
      console.log(this.model.category);
      this.model.Name = this.EditCourseData.name;
      this.obj2.get_sub_categories(this.model.category).subscribe(response => {
        this.SubCategories = response;
        // console.log(this.SubCategories);
        this.loaded = true;
      });
      this.model.sub_category = this.EditCourseData.course.SubCategory[0].id;

      console.log(this.model.sub_category);

      this.model.skill = this.EditCourseData.skill;

    }
    // this.global.GlobalUploadCourse$.subscribe(
    //   data => {
    //     if (data.length===0){
    //       this.GlobalUploadCourses = [];
    //     }else {
    //       this.GlobalUploadCourses = data;
    //     }
    //   });
    this.global.caseNumber$.subscribe(
      data => {
        this.Logedin = data;
      });

  }

  ngOnInit () {
    this.obj2.get_categories().subscribe(response => {
      this.Categories = response;
      // console.log(this.Categories);
      this.loaded = true;
    });
    // this.global.GlobalUploadCourse$.subscribe(response  => this.response  = response);
  }

  onNoClick(): void {
    this.dialogRef.close(1);
  }

  onSubmit(f: NgForm) {
    // alert(this.model.EditedForm);
    // if(Number(this.model.Discount) > Number(this.model.Price)) {
    //   AddCourseDialogComponent.greaterDiscout();
    //     }
    //     else {

    this.http.post(
      Config.ImageUploadUrl,
      this.input, {responseType: 'text'}).subscribe(data => {
      if (data === "Sorry, not a valid Image.Sorry, only JPG, JPEG, PNG & GIF files are allowed.Sorry, your file was not uploaded.") {
        EditCourseDialogComponent.ImageUploadFailer();
      } else {
        this.course_image = data;
        console.log(this.course_image);
        this.ifImageUpload();
        // alert(this.course_image);
      }
    });

    // }
  }
  private ifImageUpload() {
    // var curent_date= moment(this.model.date, "DD-MM-YYYY").add(1,'days');
    // var new_date = moment(curent_date, "DD-MM-YYYY").add(this.Date,'days');
    if(this.Days== false)
    {
      var curent_date = moment(this.Date, "DD-MM-YYYY");

      console.log("current date", new Date);
      // var fielddate= moment(curent_date,"DD-MM-YYYY");
      var new_date = moment(curent_date).add(this.end_time, 'days');
      var new_dateBuy = moment(curent_date).add(this.Sales, 'days');


    }
    else if(this.Days == true)
    {
      var curent_date = moment(this.Dates, "DD-MM-YYYY");
      var date = moment(this.Dates, ' DD-MM-YYYY ');
      var new_date = moment(date).add(this.end_time , 'days');
      console.log('Auction', date);
      console.log('Auction Later', this.model.date);

    }
    // var bid_date = moment(date).add(this.end_time,'days');

    console.log( this.model.Name, this.model.Price, this.Dic,  this.course_image, this.model.skill, this.model.category, this.model.sub_category, new_dateBuy, this.isActive, this.isActives, this.isBidPrice, this.model.SalePrice, curent_date , new_date , this.Check , this.model.ReservedPrice,this.Days);


    this.obj.upload_course(this.model.Name, this.model.Price, this.course_image, this.model.skill, this.model.category, this.model.sub_category, new_dateBuy, this.isActive, this.isActives, this.isBidPrice, this.model.SalePrice, this.Date, new_date, this.Check, this.model.ReservedPrice, this.Days).subscribe(
      data => {
        // console.log(data[0]['json'].json());
        // this.dialogRef.close(data[0]['json'].json());
        this.dialogRef.close(data[0]['json'].json());
        // this.global.getGlobalUploadCourses(this.response);
        // console.log('upload Courses', this.response);
        // this.dialogRef.close(data[0]['json'].json());
        AddCourseDialogComponent.CourseSuccess();
      },
      error => {
        AddCourseDialogComponent.CourseFailure();
      }

    );
    // if (data[0]['json'].json().hasOwnProperty("status")) {
    //   AddCourseDialogComponent.CourseFailure();
    // }
    // else {
    //   this.GlobalUploadCourses(this.dialogRef.close(data[0]['json'].json()));
    //   console.log("Ussama here33", this.GlobalUploadCourses);
    //   this.global.getGlobalUploadCourses(this.GlobalUploadCourses);
    //   AddCourseDialogComponent.CourseSuccess();

    // data => {
    //   // console.log(data[0]['json'].json());
    //   this.GlobalUploadCourses.dialogRef.close(data[0]['json'].json());
    //   this.global.getGlobalUploadCourses(this.GlobalUploadCourses);
    //   AddCourseDialogComponent.CourseSuccess();
    // },
    //   error => {
    //     AddCourseDialogComponent.CourseFailure();
    //   }
    // console.log(data[0]['json'].json());
    // this.dialogRef.close(data[0]['json'].json());
    // AddCourseDialogComponent.CourseSuccess();
  }

  // this.reserveds();
  reserved() {
    if (this.isActive) {
      this.hide = false;
    } else {
      this.hide = true;
    }
  }

  reserveds() {
    if (this.isActives) {
      this.hides = false;
    } else {
      this.hides = true;
    }
  }
  Auctions() {
    if (this.isBids) {
      this.isBids = false;
    } else {
      this.isBids = true;
    }
  }
  CheckReserved() {
    if (this.Checks) {
      this.Checks = false;
    }
    else {
      this.Checks = true;
    }
  }
  Auc() {
    if (this.Days) {
      this.Days = false;
    } else {
      this.Days = true;
    }
  }
  // AucLater() {
  //   if (this.Auct) {
  //     this.Auct = false;
  //   } else {
  //     this.Auct = true;
  //   }
  // }

  selected(cat_id) {
    this.obj2.get_sub_categories(cat_id).subscribe(response => {
      this.SubCategories = response;
      // console.log(this.SubCategories);
      this.loaded = true;
    });
  }

  static CourseSuccess() {
    swal({
      type: 'success',
      title: 'Course Added Successfully! <br> Request is sent to admin you will be notified after approval.',
      width: '512px'
    })
  }

  static CourseFailure() {
    swal({
      type: 'error',
      title: 'Oops! <br>Failed to add course. Inccorrect Information!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  static greaterDiscout() {
    swal({
      type: 'error',
      title: 'Please review form! <br>Discount amount can not be greater than course price!',
      // showConfirmButton: false,
      width: '512px',
      // timer: 2500
    })
  }

  isClick() {
    if (this.clicked === true) {
      return this.clicked = false;
    } else {
      return this.clicked = true;
    }
  }




  static onlyNumberKey(event) {
    const charCode = (event.query) ? event.query : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    } else {
      return true;
    }
  }

  onChange(event: EventTarget) {
    this.input = new FormData();
    const eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    this.input.append('fileToUpload', target.files[0]);
  }
}


@Component({
  selector: 'app-add-course--dialog',
  templateUrl: 'edit-course-dialog.html',
  styleUrls: ['../events/add-event.component.css']
})
export class EditCourseDialogComponent implements OnInit {
  public course_image: string;
  public ImageUrl = Config.ImageUrl;
  private EditCourseData: any = [];
  public isEditForm: boolean = false;
  name: any;
  page: number;
  skill: string;
  public Categories;
  public SubCategories;
  public loaded = false;
  Auction = true;
  file: any;
  file1: any;
  files: File;
  input;
  Checks= true;
  clicked = false;
  public model: any = {};
  color = 'accent';
  checked = false;
  disabled = false;
  hide;
  isActive = true;
  isActives = true;
  isBidPrice = true;
  Check = false;
  Day= false;
  ReservedPrice;
  hides;
  isBids;
  duration = 0;
  Dic = 0;
  Sale;
  SalePrice=0;
  Days= false;
  starttime;
  ranges = [
    {value: '10', viewValue: '10'},
    {value: '15', viewValue: '15'},
    {value: '21', viewValue: '21'},
    {value: '30', viewValue: '30'},
    {value: '60', viewValue: '60'}
  ];
  range = [
    {value: '3', viewValue: '3'},
    {value: '5', viewValue: '5'},
    {value: '7', viewValue: '7'},
    {value: '15', viewValue: '15'},
  ];
  end_time;
  Sales;
  Date = new Date();
  Dates = new Date();
  Name = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9_.+-, !@#$%^&*()<>{}|=~]+?')]);

  Price = new FormControl('', [
    Validators.required,
    Validators.pattern('NUMBER_REGEX')]);


  Discount = new FormControl('', [
    Validators.required, Validators.pattern('NUMBER_REGEX')]);

  DaysDuration = new FormControl('', [
    Validators.required]);

  SaleDuration = new FormControl('', [
    Validators.required
  ]);
  reservedbidamountFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('NUMBER_REGEX')]);

  StartingBidPrice = new FormControl('', [
    Validators.required
  ]);
  dateFormControl = new FormControl('', [
    Validators.required,
  ]);
  private course_id: number;
  private course_discounted_price: any = 0;
  private course_actual_price: any = 0;


  constructor(private obj: UploadCoursesService, private obj2: HeaderService, public dialogRef: MatDialogRef<AddCourseDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) {
    if(data.course_data){
      this.EditCourseData = data.course_data;
      this.isEditForm = data.isEditForm;
      console.log('Edit Course Data',this.EditCourseData);
      console.log(this.isEditForm);
      // this.model = data.course_data;
      this.course_id = this.EditCourseData.course.id;
      console.log('course_id',this.course_id);
      this.model.ids = this.EditCourseData.id;
      console.log('ids', this.model.ids);
      this.model.FirstName = this.EditCourseData.course.name;
      console.log(this.model.FirstName);
      this.model.course_image = this.EditCourseData.course.course_image;
      console.log(this.model.course_image);
      this.model.Price = this.EditCourseData.course.actual_price;
      console.log(this.model.Price);
      // this.model.Discount = this.EditCourseData.discounted_price;
      this.Sales = this.EditCourseData.course.date_durationforsale;
      console.log('Sale_Duration',this.Sales);
      this.isActive = this.EditCourseData.course.sale_status;
      console.log('isActive', this.isActive);
      this.isActives = this.EditCourseData.course.accept_offer;
      console.log('isActives', this.isActives);
      this.isBidPrice = this.EditCourseData.course.bidstatus;
      console.log('isBidPrice',this.isBidPrice);
      this.model.SalePrice = this.EditCourseData.InitAmount;
      console.log('SalePrice', this.model.SalePrice);
      this.Date = this.EditCourseData.StartTime;
      console.log('Current Date', this.Date);
      this.end_time = this.EditCourseData.EndTime;
      console.log('end_time',this.end_time);
      this.Check = this.EditCourseData.isReserved;
      console.log('CHeck',this.Check);
      this.model.ReservedPrice = this.EditCourseData.reservedPrice;
      console.log('ReservedPrice', this.model.ReservedPrice);
      this.model.category = this.EditCourseData.course.Categories[0].id;
      console.log(this.model.category);
      this.model.Name = this.EditCourseData.name;
      this.obj2.get_sub_categories(this.model.category).subscribe(response => {
        this.SubCategories = response;
        // console.log(this.SubCategories);
        this.loaded = true;
      });
      this.model.sub_category = this.EditCourseData.course.SubCategory[0].id;

      console.log(this.model.sub_category);

      this.model.skill = this.EditCourseData.course.skill;

    }

  }

  ngOnInit () {
    this.obj2.get_categories().subscribe(response => {
      this.Categories = response;
      // console.log(this.Categories);
      this.loaded = true;
    });
  }

  onNoClick(): void {
    this.dialogRef.close(1);
  }

  EditCourse() {
    // alert(this.model.EditedForm);
    // if(Number(this.model.Discount) > Number(this.model.Price)) {
    //   AddCourseDialogComponent.greaterDiscout();
    //     }
    //     else {
    if (this.input) {
      this.http.post(
        Config.ImageUploadUrl,
        this.input, {responseType: 'text'}).subscribe(data => {
        if (data === "Sorry, not a valid Image.Sorry, only JPG, JPEG, PNG & GIF files are allowed.Sorry, your file was not uploaded.") {
          EditCourseDialogComponent.ImageUploadFailer();
        } else {
          this.course_image = data;
          console.log(this.course_image);
          // alert(this.course_image);

        }
      });
    }
    else {
      this.course_image = this.model.course_image;
      // }
    }
    this.ifImageUpload();
  }

  private ifImageUpload() {
    // var curent_date= moment(this.model.date, "DD-MM-YYYY").add(1,'days');
    // var new_date = moment(curent_date, "DD-MM-YYYY").add(this.Date,'days');


    var curent_date = moment(this.Date, "DD-MM-YYYY");

    console.log("current date", this.Date);
    // var fielddate= moment(curent_date,"DD-MM-YYYY");
    var new_date = moment(curent_date).add(this.end_time, 'days');
    var new_dateBuy = moment(curent_date).add(this.Sales, 'days');


    // var curent_date = moment(this.Date, "DD-MM-YYYY");
    // var date = moment(this.Date, ' DD-MM-YYYY ');
    // var new_date = moment(date).add(this.end_time , 'days');
    // console.log('Auction', date);
    // console.log('Auction Later', this.model.date);


    console.log( this.model.FirstName, this.model.Price, this.Dic,  this.course_image, this.model.skill, this.model.category, this.model.sub_category, new_dateBuy, this.isActive, this.isActives, this.isBidPrice, this.SalePrice, curent_date , new_date , this.Check , this.model.ReservedPrice);
    this.obj.edit_course( this.course_id, this.model.FirstName, this.model.Price,  this.course_image, this.model.skill, this.model.category, this.model.sub_category, new_dateBuy, this.isActive, this.isActives, this.isBidPrice, this.model.SalePrice, curent_date , new_date , this.Check , this.model.ReservedPrice, this.Days,this.model.ids).subscribe(
      data => {
        // console.log(data[0]['json'].json());
        this.dialogRef.close(data[0]['json'].json());
        EditCourseDialogComponent.CourseSuccess();
      },
      error => {
        EditCourseDialogComponent.CourseFailure();
      }
    );
    // this.reserveds();
  }
  reserved() {
    if (this.isActive) {
      this.hide = false;
    } else {
      this.hide = true;
    }
  }

  reserveds() {
    if (this.isActives) {
      this.hides = false;
    } else {
      this.hides = true;
    }
  }
  Auctions() {
    if (this.isBids) {
      this.isBids = false;
    } else {
      this.isBids = true;
    }
  }
  CheckReserved() {
    if (this.Checks) {
      this.Checks = false;
    }
    else {
      this.Checks = true;
    }
  }
  Auc() {
    if (this.Days) {
      this.Days = false;
    } else {
      this.Days = true;
    }
  }
  selected(cat_id) {
    this.obj2.get_sub_categories(cat_id).subscribe(response => {
      this.SubCategories = response;
      // console.log(this.SubCategories);
      this.loaded = true;
    });
  }

  static CourseSuccess() {
    swal({
      type: 'success',
      title: 'Course Edited Successfully! <br> Request is sent to admin you will be notified after approval.',
      width: '512px'
    })
  }

  static CourseFailure() {
    swal({
      type: 'error',
      title: 'Oops! <br>Failed to add course. Inccorrect Information!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  static ImageUploadFailer() {
    swal({
      type: 'error',
      title: 'Oops! <br>Something Went Wrong Please try Again!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  static greaterDiscout() {
    swal({
      type: 'error',
      title: 'Please review form! <br>Discount amount can not be greater than course price!',
      // showConfirmButton: false,
      width: '512px',
      // timer: 2500
    })
  }

  isClick() {
    if (this.clicked === true) {
      return this.clicked = false;
    } else {
      return this.clicked = true;
    }
  }




  static onlyNumberKey(event) {
    const charCode = (event.query) ? event.query : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    } else {
      return true;
    }
  }

  onChange(event: EventTarget) {
    this.input = new FormData();
    const eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    this.input.append('fileToUpload', target.files[0]);
  }
}

@Component({
  selector: 'app-course-bid',
  templateUrl: './course-bid.component.html',
  styleUrls: ['../events/add-event.component.css']
})
export class CourseBidComponent implements OnInit {
  public model: any = {};

  hid = true;
  Actives = true;
  date: Date;
  count;
  time = new Date("00:00:00 GMT-0500 (EST)");


  bidamount = new FormControl('', [
    Validators.required,
    Validators.pattern('NUMBER_REGEX')]);

  reservedbidamountFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('NUMBER_REGEX')]);

  dateFormControl = new FormControl('', [
    Validators.required,
  ]);

  startTimeFormControl = new FormControl('', [
    Validators.required,
  ]);

  endTimeFormControl = new FormControl('', [
    Validators.required,
  ]);



  constructor(private obj: UploadCoursesService,
              public dialogRef: MatDialogRef<CourseBidComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {

  }
  Date;
  onSubmit(f: NgForm) {
    var curent_date= moment(this.model.date, "DD-MM-YYYY").add(1,'days');
    var new_date = moment(curent_date, "DD-MM-YYYY").add(this.Date,'days');
    // console.log(new_date,'sssssssssssss')
    // alert(this.isActive);
    this.obj.add_bid_on_course(this.model.bidamount, curent_date, new_date, this.Actives, this.model.reservedbid, this.data.BidCourse_id).subscribe(
      data => {
        // console.log(data);
        this.dialogRef.close();
        CourseBidComponent.BidCourseSuccess();
        // if (data){
        //
        //   if (data.message == "Course is not Approved by admin") {
        //     console.log(data.message);
        //     // console.log(error);
        //     CourseBidComponent.BidCourseFailure();
        //     return Observable.throw(new Error(data.message));
        //   }
        //   else if (data.message == "Course is already posted for Bid") {
        //     console.log(data.message);
        //     CourseBidComponent.BidCourseFailure2();
        //
        //     return Observable.throw(new Error(data.message));
        //   }
        // }
      }
    );
  }

  reserved() {
    if(this.hid) {
      this.hid = false;
    }
    else {
      this.hid = true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  static BidCourseSuccess() {
    swal({
      type: 'success',
      title: 'Success! <br> Bid Allowed on Course!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    });
  }
  // static InvalidInformation() {
  //   swal({
  //     type: 'error',
  //     title: 'Oops! <br> Invalid Information!',
  //     showConfirmButton: false,
  //     width: '512px',
  //     timer: 2500
  //   })
  // }
  // static BidCourseFailure() {
  //   swal({
  //     type: 'error',
  //     title: 'Oops! <br> Course not Approved by Admin !',
  //     showConfirmButton: false,
  //     width: '512px',
  //     timer: 2500
  //   })
  // }
  // static BidCourseFailure2() {
  //   swal({
  //     type: 'error',
  //     title: 'Oops! <br> Course is already posted !',
  //     showConfirmButton: false,
  //     width: '512px',
  //     timer: 2500
  //   })
  // }

  static onlyNumberKey(event) {
    const charCode = (event.query) ? event.query : event.keyCode;
    // console.log(charCode);
    if (charCode > 31
      && (charCode < 48 || charCode > 57)) {
      return false;
    }

    return true;
  }


}