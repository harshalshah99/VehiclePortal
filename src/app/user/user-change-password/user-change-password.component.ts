import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as global from '../../shared/global'
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ParentChildCommService } from './../../shared/ParentChildCommService';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent implements OnInit {
  currentUserDetails = JSON.parse(JSON.stringify(ParentChildCommService.currentUserDetails));
  changePasswordModel = {
    new_password: '',
    old_password: '',
    confirm_password: '',
  }

  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private toastr: ToastrService,
    private router: Router) {

  }

  onSubmit() {

    if (this.changePasswordModel.new_password != this.changePasswordModel.confirm_password) {
      this.toastr.error("New and Confirm Password should be same.");
      return;
    }

    var params = {
      email: this.currentUserDetails.user.email,
      new_password: this.changePasswordModel.new_password, old_password: this.changePasswordModel.old_password
    };

    var url = global.BASE_API_URL + "user/reset_user_password";
    this.spinner.show();
    this.http.post(url, params)
      .pipe(
        catchError((err, caught) => {
          this.spinner.hide();
          this.toastr.error(err.error);
          return throwError(
            'Something bad happened; please try again later.');
        })
      )
      .subscribe((data: Response) => {
        var response = JSON.parse(JSON.stringify(data));

        this.spinner.hide();

        if (response.result == "success") {
          this.toastr.success(response.message);
          this.router.navigate(['/home']);
        }
        else if (response.result == "fail") {
          this.toastr.error(response.message);
        }
        else {
          this.toastr.error('Something bad happened; please try again later.');
        }

      });
  }

  ngOnInit() {


  }

}
