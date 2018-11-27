import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {LoginComponent} from "./login.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatIconModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import { MatDialogModule } from '@angular/material';
import {ResetPasswordComponent} from './login.component';
import {AuthServiceConfig} from "angular4-social-login";
import {provideConfig} from "../app.module";
import {AuthGuard} from "../auth-guard/auth-guard.service";
import {HttpClientModule} from "@angular/common/http";
import {MatCheckboxModule} from '@angular/material';
import {RecaptchaModule} from "ng-recaptcha";
import {LoaderModule} from "../loader/loader.module";
import { BlackgeeksRecaptchaModule } from 'recaptcha-blackgeeks';

const loginRoutes: Routes = [
  { path: '', component: LoginComponent }
];


@NgModule({
  declarations: [
    LoginComponent,
    ResetPasswordComponent
  ],


  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    HttpClientModule,
    MatCheckboxModule,
    RecaptchaModule.forRoot(),
    RouterModule.forChild(loginRoutes),
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
  exports: [],
  entryComponents: [
    ResetPasswordComponent,
  ],

})

export class LoginModule {

}

