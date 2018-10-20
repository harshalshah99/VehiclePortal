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
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  currentUserDetails = JSON.parse(JSON.stringify(ParentChildCommService.currentUserDetails));
  // profileModel = {
  //   uid: this.currentUserDetails.user.uid,
  //   mobile_no: this.currentUserDetails.user.mobile_no,
  //   first_name: this.currentUserDetails.user.first_name,
  //   last_name: this.currentUserDetails.user.last_name
  // }
  profileModel = {}
  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private toastr: ToastrService,
    private router: Router) {

  }

  getProfile(){
    var url = global.BASE_API_URL + "user/verify_user";
    var params = { uid : this.currentUserDetails.user.uid };
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

        this.profileModel = {
          uid: response.uid,
          mobile_no: response.mobile_no,
          first_name: response.first_name,
          last_name: response.last_name
        }
        
        this.spinner.hide();

      });
  }

  onSubmit() {

    var url = global.BASE_API_URL + "user/update_user";
    this.spinner.show();
    this.http.post(url, this.profileModel)
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
    this.getProfile();

  }

  

}
