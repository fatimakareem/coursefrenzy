import {Component, Inject, OnInit,AfterContentInit, PLATFORM_ID} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {NgForm} from '@angular/forms';
import {FormControl, NgModel, Validators, ReactiveFormsModule} from '@angular/forms';
import {HomeService} from '../home/home.service';
import {Config} from '../Config';
import {HeaderService} from '../header/header.service';
import swal from 'sweetalert2';
import {GlobalService} from '../global.service';
import {isPlatformBrowser} from '@angular/common';
import {SimpleGlobal} from "ng2-simple-global";

declare const $: any;
@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html'
})
export class HomeSliderComponent implements OnInit {
  Logedin: any;
  checkLogin: any;
  IsLogedIn: boolean;
  islogin: boolean;
  public SliderContent: any;
  // public UserRole: any;
  public Categories: any;
  model: any;
  private loaded = false;
  ImageUrl = Config.staticStorageImages;
  search: string;
  searchSlider: string;
  public userRole: string;
  private isAdmin: boolean;
  // mainSearch = 0;
  public slideConfig;

  constructor(public dialog: MatDialog,
              private obj: HomeService,
              private obj2: HeaderService,
              private global: GlobalService,
              private glb_ser: SimpleGlobal,
              @Inject(PLATFORM_ID) private platformId: Object) {


   // alert(this.checkLogin);
    this.global.caseNumber$.subscribe(
      data => {
        this.checkLogin = data;
      });


    this.global.openSearch$.subscribe(
      data => {
        this.search = data;
        // alert("header "+this.search);
      });

    this.global.openSliderSearch$.subscribe(
      data => {
        this.searchSlider = data;
        // alert("header "+this.search);
      });
    this.global.checkingUserRole$.subscribe(
      data => {
        this.userRole = data;
        // alert('Checking Role in Header' + data);
      });


    // this.global.Categories$.subscribe(
    //   data => {
    //     this.Categories = data;
    //     // alert(this.Categories);
    //   });
  }
    ngOnInit() {
      // alert('Home slider'+this.Categories);
      // this.Categories = this.global.loadCategories();

      this.obj.get_slider_content().subscribe(response => {
        this.SliderContent = response;
        this.loaded = true;
      });



  this.obj2.get_categories().subscribe(response => {
  this.Categories = response;
  this.loaded = true;
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

  public myfunc(event: Event) {
    // carouselLoad will trigger this funnction when your load value reaches
    // it is helps to load the data by parts to increase the performance of the app
    // must use feature to all carousel
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
      this.loaded = true;
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
