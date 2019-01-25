import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NormalLayoutComponent} from "./layouts/normal-layout.component";
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';
// import { RecaptchaModule } from 'ng-recaptcha';
import {BiddingDialogComponent} from "./bidding-dialog/bidding-dialog.component";
import {SignUpservice} from './signup/signup.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  // MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';

import {MatTableModule} from '@angular/material/table';


import {Routing, AppRoutingProvider} from './app.routing';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
// import { Uploader } from 'angular2-http-file-upload';
import {AddCartDialogModule} from "./cart-dialog/add-cart-dialog.module";
import { PaymentmethodsService } from './paymentmethods/paymentmethods.service';
// import { RecapchaComponent } from './recapcha/recapcha.component';
import { RecapchaService } from './recapcha/recapcha.service';
import {UserProfileComponent} from './layouts/user-profile/user-profile.component';
import {AuthGuard} from './auth-guard/auth-guard.service';
import {LoginService} from './login/login.service';
import {LogoutComponent} from './logout/logout.component';
import {LogoutService} from './logout/logout.service';
import {UploadCoursesService} from './upload-courses/upload-courses.service';
import {CoursesService} from './course/courses.service';
import {ChangePasswordService} from './change-password/change-password.service';

import { AgmCoreModule } from '@agm/core';

import { ChangePasswordComponent } from './change-password/change-password.component';
import {SingleCourseService} from './single-course/single-course.service';
import {GlobalService} from './global.service';
import {PartnershipService} from './partnership/partnership.service';

import { ImageCropperModule } from 'ngx-image-cropper';

import { NguiDatetimePickerModule } from '@ngui/datetime-picker';
import { SlickModule } from 'ngx-slick';

import {RatingModule} from "ng2-rating";


// Importing Video Player Files
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';


import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login";

import {BasicInfoService} from './basic-info/basic-info.service';
import { SingleCategoryComponent } from './single-category/single-category.component';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BiddingService} from './bidding-dialog/bidding.service';
import { EventsService } from './events/events.service';
import {ContactUsService} from './contact-us/contact-us.service';
import { ChatComponent } from './chat/chat.component';
import {HomeService} from './home/home.service';
import {SingleEventService} from './event/single-event.service';
import { WebSocketService } from 'angular2-websocket-service';
import {ServerSocket} from './single-course/server-socket.service';
import {HeaderService} from './header/header.service';
import {InstructorService} from "./become-instructor-questions/instructor.service";
import {PagerService} from "./paginator.service";
import {AccountService} from "./account/account.service";
import {AdminPanelService} from "./admin-panel/admin-panel.service";
import {CourseCheckoutService} from "./course-checkout/course-checkout.service";


import { SimpleGlobal } from 'ng2-simple-global';
import {AdminLayoutComponent} from "./layouts/admin/admin-layout.component";
import {WebsocketService} from "./websocket.service";
import {SingleCourseGlobalService} from "./singleCourse.global.service";
import {ProfileService} from "./profile/profile.service";
import {AdminCategoriesService} from "./admin-categories/admin-categories.service";
import {AdminFaqsService} from "./admin-faqs/admin-faqs.service";
import {LoaderModule} from "./loader/loader.module";

import {HeadersService} from "./headers.service";
import {EmailActivationService} from "./email-activation/email-activation.service";
import {ChangeForgetPasswordService} from "./change-forget-password/change-forget-password.service";
import {FooterService} from "./footer/footer.service";
import {SubscriptionConfirmationService} from "./subscription-confirmation/subscription-confirmation.service";
import {BuyNowService} from "./BuyNow.service";
import {FollowUnfollowService} from "./Follow-Unfollow.service";
import {ChatboxService} from "./chatbox/chatbox.service";
import { WinbidDialogComponent } from './winbid-dialog/winbid-dialog.component';
import {AddCourseDialogComponent} from './upload-courses/upload-courses.component';
import { BuynowDialogComponent } from './buynow-dialog/buynow-dialog.component';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("494272768782-co69j2gbh9vrci7a7frhgh37l9rlpbhv.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("219249381809488")
  }
]);

export function provideConfig() {
  return config;
}
@NgModule({
  declarations: [
    NormalLayoutComponent,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UserProfileComponent,
    AdminLayoutComponent,
    LogoutComponent,
    ChangePasswordComponent,
    SingleCategoryComponent,
    ChatComponent,
    WinbidDialogComponent,
    BiddingDialogComponent,
    BuynowDialogComponent,
    // SearchResultsComponent,
    // NestedsubcatTopRatedCoursesComponent,
    // NestedsubcatTrendingNowCoursesComponent,
    // NestedsubcatBidCourseComponent,
    // NestedsubCatCoursesComponent,

  ],

  imports: [
    BrowserModule.withServerTransition({ appId: 'universal-demo-v5' }),
    BrowserTransferStateModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAH0kHXWGjjeBCjG3PNiBBmMi9usTLuW1c',
      libraries: ['geometry', 'places']
    }),
    HttpClientModule,
    ModuleMapLoaderModule,SlickModule,RatingModule,
    // SocialLoginModule.initialize(config),
    SocialLoginModule,
    BrowserModule,
    CommonModule,
    Routing,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatStepperModule,
    MatTableModule,
    // MatInput,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatTabsModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    MatTooltipModule,
    MatIconModule,
    MatStepperModule,
    MatNativeDateModule,
    NgxPaginationModule,
    // FilePickerModule,
    MatRadioModule,
    MatSelectModule,
    ImageCropperModule,
    NguiDatetimePickerModule,
    // RecaptchaModule.forRoot(),
// Videoplayer
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    AddCartDialogModule,
    LoaderModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  entryComponents: [
    ChatComponent,WinbidDialogComponent,BuynowDialogComponent,BiddingDialogComponent
  ],
 
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    AppRoutingProvider,
    SignUpservice,PaymentmethodsService,RecapchaService,
    SimpleGlobal,
    AuthGuard,
    LoginService,
    LogoutService,
    UploadCoursesService,
    // UploadChaptersService,
    HeaderService,
    ChangePasswordService,
    SingleCourseService,
    BasicInfoService,
    CoursesService,
    BiddingService,
    EventsService,
    ContactUsService,
    HomeService,
    SingleEventService,
    WebSocketService,
    ServerSocket,
    GlobalService,
    PartnershipService,
    InstructorService,
    PagerService,
    AccountService,
    AdminPanelService,
    CourseCheckoutService,
    WebsocketService,
    SingleCourseGlobalService,
    ProfileService,
    AdminCategoriesService,
    AdminFaqsService,
    HeadersService,
    EmailActivationService,
    ChangeForgetPasswordService,
    FooterService,
    SubscriptionConfirmationService,
    BuyNowService,
    FollowUnfollowService,
    ChatboxService,
    // Uploader,
  ],
 

  bootstrap: [
    AppComponent,
  ]
})
export class AppModule {
}
