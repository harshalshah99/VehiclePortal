import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserForgotPasswordComponent } from './user/user-forgot-password/user-forgot-password.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { HomeComponent } from './home/home.component';
import { TablesComponent } from './tables/tables.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'tables', component: TablesComponent },
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
