import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserForgotPasswordComponent } from './user/user-forgot-password/user-forgot-password.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { HomeComponent } from './home/home.component';
import { DevicesComponent } from './devices/devices.component';
import { DeviceDetailsComponent } from './devices/device-details/device-details.component';
import { ControlZonesComponent } from './control-zones/control-zones.component';
import { ControlZonesAddEditComponent } from './control-zones/control-zones-add-edit/control-zones-add-edit.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserChangePasswordComponent } from './user/user-change-password/user-change-password.component';
import { InfoComponent } from './info/info.component';
import { BillingPlansComponent } from './settings/billing-plans/billing-plans.component';
import { BillingComponent } from './settings/billing/billing.component';
import { EmailNotificationsComponent } from './settings/email-notifications/email-notifications.component';

const routes: Routes = [
  { path: '', component: UserLoginComponent },
  { path: 'home', component: DevicesComponent },
  { path: 'devices', component: DevicesComponent },
  { path: 'devices/details/:id', component: DeviceDetailsComponent },
  { path: 'home/details/:id', component: DeviceDetailsComponent },
  { path: 'controlZones', component: ControlZonesComponent },
  { path: 'controlZones/addedit/:id', component: ControlZonesAddEditComponent },
  { path: 'UserForgotPassword', component: UserForgotPasswordComponent },
  { path: 'UserRegister', component: UserRegisterComponent },
  { path: 'UserLogin', component: UserLoginComponent },
  { path: 'UserProfile', component: UserProfileComponent },
  { path: 'UserChangePassword', component: UserChangePasswordComponent },
  { path: 'help', component: InfoComponent },
  { path: 'settings/billingplans', component: BillingPlansComponent },
  { path: 'settings/billing', component: BillingComponent },
  { path: 'settings/emailnotifications', component: EmailNotificationsComponent }
];

@NgModule({
  imports: [
      RouterModule.forRoot(routes)
  ],
  exports: [
      RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { 

  

}
