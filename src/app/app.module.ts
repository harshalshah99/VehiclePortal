import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserForgotPasswordComponent } from './user/user-forgot-password/user-forgot-password.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { AppNavigationComponent } from './shared/app-navigation/app-navigation.component';
import { HomeComponent } from './home/home.component';
import { SideNavigationComponent } from './shared/side-navigation/side-navigation.component';
import { TablesComponent } from './tables/tables.component';
import { MasterPageComponent } from './shared/master-page/master-page.component';
import { SimplePageComponent } from './shared/simple-page/simple-page.component';


@NgModule({
  declarations: [
    AppComponent,
    UserForgotPasswordComponent,
    UserLoginComponent,
    UserRegisterComponent,
    AppNavigationComponent,
    HomeComponent,
    SideNavigationComponent,
    TablesComponent,
    MasterPageComponent,
    SimplePageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
