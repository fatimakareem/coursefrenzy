import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {HomeService} from '../home/home.service';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Config} from '../Config';
import {MatDialog, MatDialogRef} from '@angular/material';
import swal from 'sweetalert2';
import {GlobalService} from '../global.service';
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-upper-home',
  templateUrl: './upper-home.component.html'
})
export class UpperHomeComponent implements OnInit {
  public contentBelowSlider: any;
  public Specialities: any;
  public upperhome: any;
  // public UserRole: any;
  public loaded = false;
  public ImageUrl = Config.api;
  public Logedin: string = '1';
  public userRole: string;
  constructor(private obj: HomeService, private route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: Object,
              private router: Router, public dialog: MatDialog, private global: GlobalService) {
    // if (isPlatformBrowser(this.platformId)) {
    //   this.Logedin = localStorage.getItem("loged_in");
    // }
    this.global.caseNumber$.subscribe(
      data => {
        this.Logedin = data;
      });
    this.global.checkingUserRole$.subscribe(
      data => {
        this.userRole = data;
      });
  }

  ngOnInit() {

    this.obj.get_upperhome_content().subscribe(response => {
      this.upperhome = response;
  //    console.log(this.upperhome);
      this.loaded = true;
    });

  }

  onSubmit(f: NgForm) {
    // this.obj.add_benefits().subscribe(
    // // this.obj.add_benefits(this.model.course_id).subscribe(
    //   data => {
    //     console.log(data);
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(EditUpperhometDialogComponent, {
      width: '500px'
      // data: {name: this.name, animal: this.animal}
    });
  }

  openDialog2(): void {
    const dialogRef = this.dialog.open(EditUpperhome2DialogComponent, {
      width: '500px'
    });
  }

}



@Component({
  selector: 'app-edit-upperhome-dialog',
  templateUrl: './edit-upperhome-dialog.component.html',
  styleUrls: ['../events/add-event.component.css']
})
export class EditUpperhometDialogComponent implements OnInit {
  public model: any = {};
  private loaded = false;
  public UpperHomeContent: any;
  public ImageUrl = Config.api;
  content_id;

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

  constructor(private obj: HomeService, public dialogRef: MatDialogRef<EditUpperhometDialogComponent> ) { }

  ngOnInit() {
   //  this.obj.get_content_below_slider().subscribe(response => {
   //    this.UpperHomeContent = response;
   // //   console.log(this.UpperHomeContent);
   //    this.loaded = true;
   //    this.content_id = this.UpperHomeContent.id;
   //    this.model.heading = this.UpperHomeContent.heading;
   //    this.model.description = this.UpperHomeContent.description;
   //    this.model.designation = this.UpperHomeContent.designation;
   //    this.model.writer = this.UpperHomeContent.writer;
   //    this.model.signature = this.UpperHomeContent.signature;
   //  });
  }

  onSubmit(f: NgForm) {
    this.obj.update_content_below_slider(this.content_id, this.model.heading, this.model.description,
      this.model.designation, this.model.writer, this.base64textString).subscribe(
      data => {
    //    console.log(data);
        this.dialogRef.close();
        this.EditSuccess();
      },
      error => {
        console.log(error);
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
    //    console.log('Done change');
    //    console.log(this.ALLbase64textStringforPic);
      }
    } else {
      this.MaxPictureCheck = true;
    }

  }

  _handleReaderLoadedforALl(readerEvt, index) {
    const binaryString = readerEvt.target.result;
    this.ALLbase64textStringforPic[index] = btoa(binaryString);
    // console.log(this.ALLbase64textStringforPic);
    this.arrayIndex += 1;


  }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
  }

}


@Component({
  selector: 'app-edit-upperhome2-dialog',
  templateUrl: './edit-upperhome2-dialog.component.html',
  styleUrls: ['../events/add-event.component.css']
})


export class EditUpperhome2DialogComponent implements OnInit {
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



  constructor(private obj: HomeService, public dialogRef: MatDialogRef<EditUpperhome2DialogComponent>) { }

  ngOnInit() {
    this.obj.get_upperhome_content().subscribe(response => {
      this.SliderContent = response;
      // console.log(this.SliderContent);
      this.loaded = true;
      this.model.heading = this.SliderContent.heading;
      this.model.description = this.SliderContent.description;
      this.model.BackImage = this.SliderContent.BackImage;
    });
  }

  onSubmit(f: NgForm) {
    this.obj.update_upperhome_content(3, this.model.heading, this.model.searchPlaceHolder, this.base64textString).subscribe(
      data => {
    //    console.log(data);
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
