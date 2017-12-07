import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule} from "@angular/http";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {DropdownModule} from 'ngx-dropdown';
import {Form, FormsModule} from '@angular/forms';
import {LoginComponent} from './LoginPage/login.component';
import {LoginPageComponent} from './LoginPage/login/loginpage.component';
import {RegisterComponent} from './LoginPage/RegisterPage/register.component';
import {AuthHttp} from 'angular2-jwt';
import {Http, RequestOptions} from '@angular/http';
import {UserService} from '../service/userService';
import {AuthGuard} from '../service/guards/auth.guards';
import {AuthenticationService} from '../service/AuthentificationService';
import {authHttpUserFactory} from '../../authUserFactory';
import {appRouting, routing} from "./app.routing";
// import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import {CommonModule} from "@angular/common";
import {logoutComponent} from "./logout/logout.component";
import {profileComponent} from "./profile/profile.component";
import {RouterModule, Router, Routes} from "@angular/router";
import {appMenuProfileComponent} from "./profile/menuProfile/menuProfile.component";
import {EditProfileComponent} from "./profile/EditProfile/editProfile.component";
import {InfoProfileComponent} from "./profile/InfoProfile/infoProfile.component";
import {ImageComponent} from "./imageArea/image.component";
import {Ng2CloudinaryModule} from "ng2-cloudinary";
import { FileUploadModule } from 'ng2-file-upload';
import {CloudinaryComponent} from "./CloudinaryImageComponent/CloudinaryComponent";
import {ProjectPageComponent} from "./createProject/projectPage.component";
import {DatePickerModule} from "ng2-datepicker";
import {SuccesRegistrationComponent} from "./succesfulRegistration/succesRegistration.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule } from '@angular/material';
import {OverlayContainer} from "@angular/cdk/typings/overlay";
import {ConfirmProfileComponent} from "./profile/confirmProfile/confirmProfile.component";
import {ProjectInfoComponent} from "./profile/projectPage/projectInfo.component";
import {AdminPageComponent} from "./profile/adminPage/adminPage.component";
import {ErrorAccesComponent} from "./Error/errorAcces/errorAcces.component";
import {ValidationData} from "../service/validationData";
import {ViewProjectComponent} from "./ViewProjectComponent/viewProject.component";
import {ProjectService} from "../service/projectService";
import {ProjectListComponent} from "./ViewProjectList/projectList.component";
import {HeaderService} from "../service/HeaderService";
import {SearcheResultComponent} from "./SearcheResult/searcheResult.component";
import {ContanerForProjectComponent} from "./ViewProjectList/OneProjectFromList/contanerForProject.component";
import {MessageComponent} from "./profile/MessagePage/Message.component";
import {PayProjectComponent} from "./ViewProjectComponent/PayProject/payProject.component";
import { TagInputModule } from 'ngx-chips';
import {BlockAccountComponent} from "./Error/BlockedAccount/blockAccount.component";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    LoginPageComponent,
    RegisterComponent,
    logoutComponent,
    profileComponent,
    appMenuProfileComponent,
    EditProfileComponent,
    InfoProfileComponent,
    ImageComponent,
    CloudinaryComponent,
    ProjectPageComponent,
    SuccesRegistrationComponent,
    ConfirmProfileComponent,
    ProjectInfoComponent,
    AdminPageComponent,
    ErrorAccesComponent,
    ViewProjectComponent,
    ProjectListComponent,
    SearcheResultComponent,
    ContanerForProjectComponent,
    MessageComponent,
    PayProjectComponent,
    BlockAccountComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DropdownModule,
    FormsModule,
    CommonModule,
    routing,
    HttpModule,
    HttpClientModule,
    Ng2CloudinaryModule,
    FileUploadModule,
    TagInputModule,
    DatePickerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpUserFactory,
      deps: [Http, RequestOptions]
    },
    UserService,
    AuthGuard,
    AuthenticationService,
    ValidationData,
    ProjectService,
    HeaderService
  ],
  bootstrap: [ AppComponent]
})
export class AppModule {}
