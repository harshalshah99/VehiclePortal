import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserForgotPasswordComponent } from './user/user-forgot-password/user-forgot-password.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { HomeComponent } from './home/home.component';
import { DevicesComponent } from './devices/devices.component';
import { ControlZonesComponent } from './control-zones/control-zones.component';

const routes: Routes = [
  { path: '', component: UserLoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'devices', component: DevicesComponent },
  { path: 'controlZones', component: ControlZonesComponent },
  { path: 'UserForgotPassword', component: UserForgotPasswordComponent },
  { path: 'UserRegister', component: UserRegisterComponent },
  { path: 'UserLogin', component: UserLoginComponent }
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
