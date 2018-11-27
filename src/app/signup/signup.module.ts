import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SignUpComponent} from "./signup.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatIconModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {HttpClientModule} from "@angular/common/http";
import {AuthServiceConfig} from "angular4-social-login";
import {provideConfig} from "../app.module";
import {AuthGuard} from "../auth-guard/auth-guard.service";
// import {RecaptchaModule} from "ng-recaptcha";
import {LoaderModule} from "../loader/loader.module";
import { BlackgeeksRecaptchaModule } from 'recaptcha-blackgeeks';

const signupRoutes: Routes = [
  { path: '', component: SignUpComponent }
];

@NgModule({
  declarations: [
    SignUpComponent
  ],

  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatInputModule,
    // AuthGuard,
    HttpClientModule,
    // RecaptchaModule.forRoot(),
    RouterModule.forChild(signupRoutes),
    LoaderModule,
    BlackgeeksRecaptchaModule
  ],

  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    AuthGuard
  ],
  exports: []

})

export class SignupModule {

}

