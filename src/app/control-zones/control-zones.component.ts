import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as global from '../shared/global'
import { ParentChildCommService } from './../shared/ParentChildCommService';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { OlMapComponent } from './../shared/ol-map/ol-map.component';

@Component({
  selector: 'app-control-zones',
  templateUrl: './control-zones.component.html',
  styleUrls: ['./control-zones.component.css']
})
export class ControlZonesComponent implements OnInit {

  currentUserDetails = JSON.parse(JSON.stringify(ParentChildCommService.currentUserDetails));
  controlZoneData = [];
  constructor(private http: HttpClient,private spinner: NgxSpinnerService,private toastr: ToastrService,
    private router: Router) {
   
 }
 @ViewChild(OlMapComponent) olMap:OlMapComponent;
 ngOnInit() {
  this.getControlZones();
}

getControlZones() {
  var url = global.BASE_API_URL + "geofence/get_geofences";
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
    this.controlZoneData = response; 
    console.log(response);
  });
}

renderMap(lat,lng){
  this.olMap.renderMap(lat,lng);
}
}
