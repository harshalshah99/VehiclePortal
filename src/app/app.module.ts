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
import { MasterPageComponent } from './shared/master-page/master-page.component';
import { SimplePageComponent } from './shared/simple-page/simple-page.component';
import { DevicesComponent } from './devices/devices.component';
import { ControlZonesComponent } from './control-zones/control-zones.component';
import { OlMapComponent } from './shared/ol-map/ol-map.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserChangePasswordComponent } from './user/user-change-password/user-change-password.component';
import { InfoComponent } from './info/info.component';
import { DeviceDetailsComponent } from './devices/device-details/device-details.component';
import { BillingPlansComponent } from './settings/billing-plans/billing-plans.component';
import { BillingComponent } from './settings/billing/billing.component';
import { EmailNotificationsComponent } from './settings/email-notifications/email-notifications.component';
import { ControlZonesAddEditComponent } from './control-zones/control-zones-add-edit/control-zones-add-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    UserForgotPasswordComponent,
    UserLoginComponent,
    UserRegisterComponent,
    AppNavigationComponent,
    HomeComponent,
    SideNavigationComponent,
    MasterPageComponent,
    SimplePageComponent,
    DevicesComponent,
    ControlZonesComponent,
    OlMapComponent,
    UserProfileComponent,
    UserChangePasswordComponent,
    InfoComponent,
    DeviceDetailsComponent,
    BillingPlansComponent,
    BillingComponent,
    EmailNotificationsComponent,
    ControlZonesAddEditComponent
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
