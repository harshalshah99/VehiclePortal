import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as global from '../../shared/global'

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  userRegistrationModel = {
    
  }

  constructor(private http: HttpClient) { }

  onSubmit() {
    var url = global.BASE_API_URL + "user/create_user";

    this.http.post(url, this.userRegistrationModel)
    .pipe(
      catchError(this.handleLoginError)
    )
    .subscribe((data: Response) => {
      var response = JSON.parse(JSON.stringify(data));
    
      if(response && response.result == "success")
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
