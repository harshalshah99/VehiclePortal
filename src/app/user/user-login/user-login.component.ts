import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as global from '../../shared/global'
import { ParentChildCommService } from './../../shared/ParentChildCommService';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  providers: [ParentChildCommService]
})
export class UserLoginComponent implements OnInit {

  loginModel = {
   
  }

  isUserLogin = false;
  constructor(private http: HttpClient,private spinner: NgxSpinnerService,private toastr: ToastrService,
    private router: Router) {
   
 }

  onSubmit() {
    var url = global.BASE_API_URL + "auth/login";

    this.spinner.show();
    this.http.post(url, this.loginModel)
    .pipe(
      catchError((err, caught) => {
        this.spinner.hide();
        this.toastr.error(err.error.reason);
        return throwError(
          'Something bad happened; please try again later.');
      })
    )
    .subscribe((data: Response) => {
      this.spinner.hide();
      this.toastr.success('Login Successful');
      var response = JSON.parse(JSON.stringify(data));    
      if(response && response.status == "success")
      {
        localStorage.setItem("currentUser", JSON.stringify(data));
        ParentChildCommService.setLoginPreferences();
      }
      location.href = '/home';
    });
  }

  ngOnInit() {
    ParentChildCommService.isUserLogin.subscribe(message => this.isUserLogin = message);
    ParentChildCommService.setLoginPreferences();

    if(this.isUserLogin){
      this.router.navigate(['/home']);
    }
  }

}
