import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  userRegistrationModel = {
    
  }

  constructor(private http: HttpClient) { }

  submitted = false;

  onSubmit() {
    debugger;
    this.submitted = true;
    var url = "http://54.245.75.115/services/user/create_user";

    this.http.post(url, this.userRegistrationModel)
    .pipe(
      catchError(this.handleLoginError)
    )
    .subscribe((data: Response) => {
      var response = data;
    

      // if(response && response.result.toString() == "success")
      // {
      //     alert('Success');
      // }

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
