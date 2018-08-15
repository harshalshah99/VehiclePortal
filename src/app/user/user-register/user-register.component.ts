import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as global from '../../shared/global';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  userRegistrationModel = {
    
  }

  constructor(private http: HttpClient,private spinner: NgxSpinnerService,private toastr: ToastrService,
    private router: Router) {
   
 }

  onSubmit() {
    var url = global.BASE_API_URL + "user/create_user";
    this.spinner.show();

    this.http.post(url, this.userRegistrationModel)
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
      var response = JSON.parse(JSON.stringify(data));
    
      if(response && response.result == "success")
      {
        this.toastr.success("User Registered Successfully. Please login.");
        this.router.navigate(['/UserLogin']);
      }
      else if(response && response.result == "fail")
      {
        this.toastr.error(response.message);
      }
      else{
        this.toastr.error(response.message);
      }
      
    });
  }

  ngOnInit() {


  }

}
