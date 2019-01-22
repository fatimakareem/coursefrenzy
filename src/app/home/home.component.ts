import {Component, OnInit,AfterContentInit, OnDestroy, PLATFORM_ID, Inject} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {HomeService} from './home.service';
import {GlobalService} from '../global.service';
import {CoursesService} from '../course/courses.service';
import {Config} from '../Config';
import swal from 'sweetalert2';
import {BiddingDialogComponent} from '../bidding-dialog/bidding-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog,MatDialogRef} from '@angular/material';
import { BuyNowService } from '../BuyNow.service';
import { AddCartDialogComponent } from '../cart-dialog/add-cart-dialog.component';
import {NgForm} from '@angular/forms';
import {FormControl, NgModel, Validators, ReactiveFormsModule} from '@angular/forms';
import {HeaderService} from '../header/header.service';
import {SimpleGlobal} from "ng2-simple-global";
import { BuynowDialogComponent } from '../buynow-dialog/buynow-dialog.component';

// import { HomeSliderEidtDialogComponent } from './.component';
declare const $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  IsLogedIn: boolean;
  islogin: boolean;
  public SliderContent: any;
  // public UserRole: any;
  public Categories: any;
  model: any;
  ImageUrl_storage = Config.staticStorageImages;
  search: string;
  searchSlider: string;
  public userRole: string;
  private isAdmin: boolean;
  getingRoleData: any;
  public UserRole: any;
  checkLogin: string = '1';
  public BidCourses: any;
  public courses:any;
  public openHeart  = 'fa fa-heart-o';
  public fillHeart  = 'fa fa-heart';
  public loaded: boolean;
  public ImageUrl = Config.ImageUrl;
  Logedin: string;
  public page = 1 ;
  public heart= false;
  public heartClass= 'fa fa-heart-o';
  public data:any;
  public GlobalWishListCourses: any= [];
 public slideConfig;
 public trendingNowCourses: any=[];
 private enrolled: any;
 public topRatedCourses: any;
 public Courses: any;
 public showrecent: boolean;
 constructor( @Inject(PLATFORM_ID) private platformId: Object, private obj: 
  HomeService,private obj_CoursesService: CoursesService,private nav: Router,
  private route: ActivatedRoute,private obj2: HeaderService, private buyNowService: BuyNowService,private dialog: MatDialog, private router: Router, 
  private global: GlobalService,private glb_ser: SimpleGlobal) {
    this.obj_CoursesService.get_all().subscribe(response => {
      this.data = response;
      // this.loaded = true;
            this.loaded = true;
            $('.homeSlider').fadeOut(0);
            if (this.data) {
             this.slideConfig =  {
                  infinite: true,
                  slidesToShow: 5,
                  slidesToScroll: 5,
                  autoplay: false,
                  dots: false,
                  prevArrow: '<button class="leftRs">&lt;</button>',
                  nextArrow: '<button class="rightRs">&lt;</button>',
                  responsive: [
                    {
                      breakpoint: 1024,
                      settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true
                      }
                    },
                    {
                      breakpoint: 600,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                      }
                    },
                    {
                      breakpoint: 480,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                      }
                    }
      
                  ]
              };
            }
            $('.homeSlider').fadeIn(500).delay(200);
          });

this.obj2.get_categories().subscribe(response => {
  this.Categories = response;
  // this.loaded = true;
        this.loaded = true;
        $('.homeSlider').fadeOut(0);
        if (this.Categories) {
         this.slideConfig =  {
              infinite: true,
              slidesToShow: 5,
              slidesToScroll: 5,
              autoplay: false,
              dots: false,
              prevArrow: '<button class="leftRs">&lt;</button>',
              nextArrow: '<button class="rightRs">&lt;</button>',
              responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
  
              ]
          };
        }
        $('.homeSlider').fadeIn(500).delay(200);
      });
//    this.obj_CoursesService.get_bid_courses(this.page).subscribe(response => {
//       this.BidCourses = response;
//  console.log(this.BidCourses);
//       // console.log(this.BidCourses);

//       // this.loaded = true;

//     this.slideConfig = {
//           infinite: false,
//           speed: 900,
//           autoplay: true,
//           slidesToShow: 5,
//           slidesToScroll: 5,
//           prevArrow: '<button class="leftRs">&lt;</button>',
//           nextArrow: '<button class="rightRs">&lt;</button>',
//           responsive: [
//             {
//               breakpoint: 1025,
//               settings: {
//                 slidesToShow: 4,
//                 slidesToScroll: 4,
//                 infinite: true
//               }
//             },
//             {
//               breakpoint: 769,
//               settings: {
//                 slidesToShow: 3,
//                 slidesToScroll: 1
//               }
//             },
//             {
//               breakpoint: 480,
//               settings: {
//                 slidesToShow: 1,
//                 slidesToScroll: 1
//               }
//             }
//     ]};

//     });
 
 
    this.global.caseNumber$.subscribe(
      data => {
        this.checkLogin = data;
      });
    this.global.checkingUserRole$.subscribe(
      data => {
        this.UserRole = data;
        // alert('Geting DAta From Shared Service' + this.UserRole);
      });
      this.global.caseNumber$.subscribe(
        data => {
          this.Logedin = data;
        });
  
      this.global.GlobalWishListCourses$.subscribe(
        data => {
          if (data.length===0){
            this.GlobalWishListCourses = [];
          }else {
            this.GlobalWishListCourses = data;
          }
        });



        // this.obj_CoursesService.get_courses(1).subscribe(response => {
        //   this.trendingNowCourses = response;
        //   // this.loaded = true;
        //   this.slideConfig = {
        //     infinite: false,
        //     speed: 900,
        //     autoplay: true,
        //     slidesToShow: 5,
        //     slidesToScroll: 5,
        //     prevArrow: '<button class="leftRs">&lt;</button>',
        //     nextArrow: '<button class="rightRs">&lt;</button>',
        //     responsive: [
        //       {
        //         breakpoint: 1025,
        //         settings: {
        //           slidesToShow: 4,
        //           slidesToScroll: 4,
        //           infinite: true
        //         }
        //       },
        //       {
        //         breakpoint: 769,
        //         settings: {
        //           slidesToShow: 3,
        //           slidesToScroll: 1
        //         }
        //       },
        //       {
        //         breakpoint: 480,
        //         settings: {
        //           slidesToShow: 1,
        //           slidesToScroll: 1
        //         }
        //       }
        //     ]};
        // });
        // this.obj_CoursesService.get_top_rated_courses(1).subscribe(response => {
        //   this.topRatedCourses = response;
        //   // console.log("Top rated"+this.topRatedCourses['courses'].course[0]);
        //   // this.loaded = true;
        
        //   this.slideConfig = {
        //     infinite: false,
        //     speed: 900,
        //     autoplay: true,
        //     slidesToShow: 5,
        //     slidesToScroll: 5,
        //     prevArrow: '<button class="leftRs">&lt;</button>',
        //     nextArrow: '<button class="rightRs">&lt;</button>',
        //     responsive: [
        //       {
        //         breakpoint: 1025,
        //         settings: {
        //           slidesToShow: 4,
        //           slidesToScroll: 4,
        //           infinite: true
        //         }
        //       },
        //       {
        //         breakpoint: 769,
        //         settings: {
        //           slidesToShow: 3,
        //           slidesToScroll: 1
        //         }
        //       },
        //       {
        //         breakpoint: 480,
        //         settings: {
        //           slidesToShow: 1,
        //           slidesToScroll: 1
        //         }
        //       }
        //     ]};
        // });
        this.obj_CoursesService.get_recommendcourse(this.page).subscribe(
          data => {
            this.Courses = data;
            // this.glb_ser['Courses'] = this.Courses;
            // this.loaded = true;
        
            this.slideConfig = {
              infinite: true,
              speed: 900,
              autoplay: true,
              slidesToShow: 5,
              slidesToScroll: 5,
              prevArrow: '<button class="leftRs">&lt;</button>',
              nextArrow: '<button class="rightRs">&lt;</button>',
              responsive: [
                {
                  breakpoint: 1025,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true
                  }
                },
                {
                  breakpoint: 769,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]};
        
          });
          this.obj_CoursesService.get_recent_cources(1).subscribe(response => {
            if(response.hasOwnProperty("status")){
              this.courses = [];
              this.showrecent = false;
              this.global.setShowRecent(false);
            }else {
              this.courses = response;
              this.showrecent = true;
              this.global.setShowRecent(true);
              //
              // alert(this.Courses);
              // alert('Recent Courses Come and Length is' + this.Courses.length)
            }
            // if(response.length===)
            // console.log(this.Courses['courses']);
            this.slideConfig = {
              infinite: true,
              speed: 900,
              autoplay: true,
              slidesToShow: 5,
              slidesToScroll: 5,
              prevArrow: '<button class="leftRs">&lt;</button>',
              nextArrow: '<button class="rightRs">&lt;</button>',
              responsive: [
                {
                  breakpoint: 1025,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true
                  }
                },
                {
                  breakpoint: 769,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]};
          
          });
  }

  ngOnInit() {
    // Start Slider
    
    // this.obj.get_slider_content().subscribe(response => {
    //   this.SliderContent = response;
    //   this.loaded = true;
    // });



    // End Slider

    // Start bid_courses slider 
  
     // End bid_courses slider 
// start trending-courses slider



// End trending-courses slider

// Start app-top-rated-courses


// End app-top-rated-courses

//  start recommended-courses




// End recommended-courses

// Start recently-viewed-courses

// End recently-viewed-courses
if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('home', 'true');
    }

    if (this.checkLogin === '1') {
      this.obj.get_role().subscribe(response => {
        this.getingRoleData = response;
        this.UserRole = this.getingRoleData.Role;
        // alert('Home Role' + this.UserRole);
        this.global.checkUserRole(this.UserRole);
        this.loaded = true;
      });
    }


    
  }

  openSearch() {
    // this.global.mainSearchCourses = 1;
    this.global.searchSlider('1');
    this.global.search('1');
    // this.search = '1';
    setTimeout(function () {
      $('#textsearch').focus();
    }, 200);
  }
  isAuthenticated() {
    if (isPlatformBrowser(this.platformId)) {
      const user = sessionStorage.getItem('currentUser');

      if (user !== '' && user) {
        return true;
      } else {
        return false;
      }
    }
  }

  logFunction() {
    if (isPlatformBrowser(this.platformId)) {
      this.Logedin = localStorage.getItem('login');
      this.global.publishData(0);
      // if (this.Logedin == null) {
      //   this.IsLogedIn = false;
      // } else {
      //   this.IsLogedIn = true;
      // }
    }
    // alert(this.IsLogedIn);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(HomeSliderEidtDialogComponent, {
      width: '500px',
      // data: {name: this.name, animal: this.animal}
    });
  }

  // buyNowClick1(index, course_id): void {
  //   this.buyNowService.buyNow(index, course_id,this.Logedin)
  // }
  buyNowClick(index, course_id): void {
    if(this.Logedin === '1'){
    this.obj_CoursesService.buyNowcheck(index, course_id,this.Logedin).subscribe(
      data => {
        // alert(data.message)
       if(this.Logedin === '1' && data.message=="Course is already in your My Courses"){
        swal({
          type: 'error',
          title: 'You Already Bought this course',
          showConfirmButton: false,
          width: '512px',
          timer: 1500
        });
       }
    else if (this.Logedin === '1' && data.message != "Course is already in your My Courses") {
      const dialogRef = this.dialog.open(BuynowDialogComponent, {
        width: '500px',
        data: { course_id: course_id,
          // CourseDetail: this.Courses
        }
      });
    } else {
     
        swal({
          type: 'error',
          title: 'Authentication Required <br> Please Login or Signup first',
          showConfirmButton: false,
          width: '512px',
          timer: 1500
        });
      
      this.nav.navigate(['login']);
    }})}
    else{
      swal({
        type: 'error',
        title: 'Authentication Required <br> Please Login or Signup first',
        showConfirmButton: false,
        width: '512px',
        timer: 1500
      });
    
    this.nav.navigate(['login']);
    }
  }

  openDialog3(index, course_id): void {
    if (this.Logedin === '1') {
      const dialogRef = this.dialog.open(AddCartDialogComponent, {
        width: '500px',
        data: { course_id: course_id,
          // CourseDetail: this.Courses
        }
      });
    } else {
     
        swal({
          type: 'error',
          title: 'Authentication Required <br> Please Login or Signup first',
          showConfirmButton: false,
          width: '512px',
          timer: 1500
        });
      
      this.nav.navigate(['login']);
    }
  }
  goToTopRatedCourses() {
    this.nav.navigate(['courses/top-rated']);
  }
  bidcourse(){
    alert('hello')
    this.nav.navigate(['/bid-courses']);

  }
  enrollCourse(index, course_id): void {
    if (this.Logedin === '1') {
      this.obj_CoursesService.enroll_free_course(course_id).subscribe(
        data => {
          this.enrolled = data[0]['json'].json();
          if(this.enrolled.status===false) {
            HomeComponent.EnrollmentError();
          }
          else {
            HomeComponent.EnrollmentSuccess();
          }
        },
        error => {
          // console.log(error);
        }
      );
    }
    else {
      HomeComponent.Authenticat();
      this.nav.navigate(['login']);
    }
  }

  static EnrollmentError() {
    swal({
      type: 'error',
      title: 'You Already Enrolled This Course.',
      showConfirmButton: false,
      width: '512px',
      timer: 2000
    })
  }
  static EnrollmentSuccess() {
    swal({
      type: 'success',
      title: 'Success! <br> Successfuly Purchased.',
      showConfirmButton: false,
      width: '512px',
      timer: 3000,
    });
  }
  onclick(index, course_id) {
    if (this.Logedin === '1') {
      this.obj_CoursesService.add_wishlist(course_id).subscribe(
        data => {
          console.log(data);
          if(data[0]['json'].json().hasOwnProperty("status")) {
            HomeComponent.AlreadyInWishlistError();
          }
          else {
            this.GlobalWishListCourses.push(data[0]['json'].json());
            this.global.getGolbalWishListCourses(this.GlobalWishListCourses);
            HomeComponent.wishlistSuccess();
          }
        }
      );
    }
    else {
      HomeComponent.Authenticat();
      this.nav.navigate(['login']);
    }
  }
  static AlreadyInWishlistError() {
    swal({
      type: 'warning',
      title: 'Oops! <br> This course already exists in your wishlist!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  static wishlistSuccess() {
    swal({
      type: 'success',
      title: 'Success! <br> Successfuly added to wishlist.',
      showConfirmButton: false,
      width: '512px',
      timer: 2000,
      position: 'top-end'
    });
  }


  openDialog2(bid_id): void {
    if (this.Logedin == '1') {
      const dialogRef = this.dialog.open(BiddingDialogComponent, {
        width: '500px',
        data: { bid_id: bid_id }
      });
    } else {
      HomeComponent.Authenticat();
      this.nav.navigate(['login']);
    }

  }

  static Authenticat() {
    swal({
      type: 'error',
      title: 'Authentication Required <br> Please Login or Signup first',
      showConfirmButton: false,
      width: '512px',
      timer: 1500
    });
  }


  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('home', 'false');
    }
  }
}
@Component({
  selector: 'app-home-slider-eidt-dialog',
  templateUrl: './home-slider-eidt-dialog.component.html',
  styleUrls: ['../events/add-event.component.css']
})
export class HomeSliderEidtDialogComponent implements OnInit {
  public model: any = {};
  private loaded = false;
  public SliderContent: any;
  public ImageUrl = Config.api;


  name: any;
  page: number;
  PictureCheck = false;
  MaxPictureCheck = false;
  ShowPictureError = false;
  arrayIndex = 0;
  private base64textString = '';
  private base64textString1 = '';
  sizeLimit = 2000000;
  Fixed = true;
  base64textStringforPic: any [];
  ALLbase64textStringforPic = {0: 'dfghjk'};

  Addbestoffer = false;
  Auction = true;
  file: any;
  file1: any;
  files: FileList;

  clicked = false;
  color = 'accent';
  checked = false;
  disabled = false;



  constructor(private obj: HomeService, public dialogRef: MatDialogRef<HomeSliderEidtDialogComponent> ) { }

  ngOnInit() {
    this.obj.get_slider_content().subscribe(response => {
      this.SliderContent = response;
      // console.log(this.SliderContent);
      // this.loaded = true;
      this.model.heading = this.SliderContent.heading;
      this.model.searchPlaceHolder = this.SliderContent.searchPlaceHolder;
      this.model.SliderImage = this.SliderContent.SliderImage;
    });
  }

  onSubmit(f: NgForm) {
    this.obj.update_home_slider(3, this.model.heading, this.model.searchPlaceHolder, this.base64textString).subscribe(
      data => {
        // console.log(data);
        this.dialogRef.close();
        this.EditSuccess();
      },
      error => {
        // console.log(error);
      }
    );
  }

  EditSuccess() {
    swal({
      type: 'success',
      title: 'Edit Success <br> Changes saved into database!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onChange(event: EventTarget) {
    const eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    this.files = target.files;
    if (this.files.length >= 0 && this.files.length < 5) {

      this.MaxPictureCheck = false;
      this.file = this.files[0];

      this.PictureCheck = true;
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(this.file);

      if (this.files.length > 0 && this.files.length < 5) {

        for (let a = 1; a < (this.files.length); a++) {
          // alert(a);
          this.file1 = this.files[a];
          const reader1 = new FileReader();
          reader1.onload = (e: any) => {
            this._handleReaderLoadedforALl(e, a - 1);
          };
          // this._handleReaderLoadedforALl.bind(this.file1, a-1);
          reader1.readAsBinaryString(this.file1);
        }
        // console.log('Done change');
        // console.log(this.ALLbase64textStringforPic);
      }
    } else {
      this.MaxPictureCheck = true;
    }

  }

  _handleReaderLoadedforALl(readerEvt, index) {
    // console.log('attt  ',index);
    const binaryString = readerEvt.target.result;
    // console.log('123456');
    // console.log('asdfghjk   ',btoa(binaryString))
    // // this.arrayIndex=0;

    this.ALLbase64textStringforPic[index] = btoa(binaryString);
    // console.log(this.ALLbase64textStringforPic);
    this.arrayIndex += 1;


  }


  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);

  }

}
