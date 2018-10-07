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
  selector: 'app-email-notifications',
  templateUrl: './email-notifications.component.html',
  styleUrls: ['./email-notifications.component.css']
})
export class EmailNotificationsComponent implements OnInit {

  currentUserDetails = JSON.parse(JSON.stringify(ParentChildCommService.currentUserDetails));

  IsEnteredGeofence = { checked : false, value : 1 };
  IsExitedGeofence  = { checked : false, value : 2 };
  IsDeviceBoot  = { checked : false, value : 4 };
  IsDeviceShutdown  = { checked : true, value : 8 };
  IsSIMChanged  = { checked : false, value : 16 };
  IsDeviceNotSeen   = { checked : false, value : 32 };

  preferences : number;

  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private toastr: ToastrService,
    private router: Router) {

  }

  ngOnInit() {
  }

  savePreferences(){
    this.getPreferences();
    var url = global.BASE_API_URL + "user/update_user";
    var params = { uid : this.currentUserDetails.user.uid, notifications: this.preferences };
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
        }
        else if (response.result == "fail") {
          this.toastr.error(response.message);
        }
        else {
          this.toastr.error('Something bad happened; please try again later.');
        }

      });
  }

  getPreferences(){
    this.preferences = 0;
    if(this.IsEnteredGeofence && this.IsEnteredGeofence.checked)
    {
      this.preferences += this.IsEnteredGeofence.value;
    }
    if(this.IsExitedGeofence && this.IsExitedGeofence.checked)
    {
      this.preferences += this.IsExitedGeofence.value;
    }
    if(this.IsDeviceBoot && this.IsDeviceBoot.checked)
    {
      this.preferences += this.IsDeviceBoot.value;
    }
    if(this.IsDeviceShutdown && this.IsDeviceShutdown.checked)
    {
      this.preferences += this.IsDeviceShutdown.value;
    }
    if(this.IsSIMChanged && this.IsSIMChanged.checked)
    {
      this.preferences += this.IsSIMChanged.value;
    }
    if(this.IsDeviceNotSeen && this.IsDeviceNotSeen.checked)
    {
      this.preferences += this.IsDeviceNotSeen.value;
    }
  }

  setPreferences(){
    
  }

}
