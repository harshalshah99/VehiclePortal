import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as global from '../../shared/global'


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  loginModel = {
   
  }

  constructor(private http: HttpClient) { }

  onSubmit() {
    var url = global.BASE_API_URL + "auth/login";

    this.http.post(url, this.loginModel)
    .pipe(
      catchError(this.handleLoginError)
    )
    .subscribe((data: Response) => {
      var response = JSON.parse(JSON.stringify(data));
      
      if(response && response.status == "success")
      {
        localStorage.setItem("currentUser", JSON.stringify(data));
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
