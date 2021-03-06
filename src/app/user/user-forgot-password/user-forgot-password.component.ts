import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as global from '../../shared/global'
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-forgot-password',
  templateUrl: './user-forgot-password.component.html',
  styleUrls: ['./user-forgot-password.component.css']
})
export class UserForgotPasswordComponent implements OnInit {

  forgotPasswordModel = {
    
  }

  constructor(private http: HttpClient,private spinner: NgxSpinnerService,private toastr: ToastrService,
    private router: Router) {
   
 }


  onSubmit() {
    var url = global.BASE_API_URL + "auth/forgot";
    this.spinner.show();
    this.http.post(url, this.forgotPasswordModel)
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
      this.toastr.success('Reset Successful.');
    });
  }

  ngOnInit() {


  }

}
