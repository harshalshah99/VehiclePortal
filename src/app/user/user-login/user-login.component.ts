import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  loginModel = {
    "email": "test@test.com",
    "password": "test123"
  }

  constructor(private http: HttpClient) { }

  submitted = false;

  onSubmit() {
    this.submitted = true;
    var url = "http://54.245.75.115/services/auth/login";

    this.http.post(url, this.loginModel)
    .pipe(
      catchError(this.handleLoginError)
    )
    .subscribe((data: Response) => {
      var response = data;
      debugger;

      if(response && response.status.toString() == "success")
      {
          alert('Success');
      }

      console.log(response);
    });
  }

  private handleLoginError(error: HttpErrorResponse) {
   
    alert('Fail');

    //return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
  ngOnInit() {


  }

}
