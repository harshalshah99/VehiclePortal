import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as global from '../../shared/global'
import { ParentChildCommService } from './../../shared/ParentChildCommService';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-billing-plans',
  templateUrl: './billing-plans.component.html',
  styleUrls: ['./billing-plans.component.css']
})
export class BillingPlansComponent implements OnInit {

  currentUserDetails = JSON.parse(JSON.stringify(ParentChildCommService.currentUserDetails));
  billingPlansData = [];
  selectedPlanId = 2;
  constructor(private http: HttpClient,private spinner: NgxSpinnerService,private toastr: ToastrService,
    private router: Router) {
   
 }
 ngOnInit() {
  this.getBillingPlans();
}

getBillingPlans() {
  var url = global.BASE_API_URL + "billing/get_billing_plans";
  var params = { uid : this.currentUserDetails.user.uid };
  this.spinner.show();
  this.http.post(url, params)
  .pipe(
    catchError((err, caught) => {
      this.spinner.hide();
      this.toastr.error('Something bad happened; please try again later.');
      return throwError(
        'Something bad happened; please try again later.');
    })
  )
  .subscribe((data: Response) => {
    this.spinner.hide();
    var response = JSON.parse(JSON.stringify(data));   
    this.billingPlansData = response; 
  });
}

selectBillingPlan(plan_id){
  var url = global.BASE_API_URL + "user/update_user";
  var params = { uid : this.currentUserDetails.user.uid, plan_id: plan_id };
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

}
