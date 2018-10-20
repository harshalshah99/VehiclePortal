import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as global from '../../shared/global'
import { ParentChildCommService } from './../../shared/ParentChildCommService';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { OlMapComponent } from './../../shared/ol-map/ol-map.component';

@Component({
  selector: 'app-control-zones-add-edit',
  templateUrl: './control-zones-add-edit.component.html',
  styleUrls: ['./control-zones-add-edit.component.css']
})
export class ControlZonesAddEditComponent implements OnInit {

  currentUserDetails = JSON.parse(JSON.stringify(ParentChildCommService.currentUserDetails));
  controlZone = {
    name:'',
    radius:'',
    address:'Ahmedabad',
    lat:0,
    lng:0
  };
  markerData = [];
  constructor(private http: HttpClient,private spinner: NgxSpinnerService,private toastr: ToastrService,
    private router: Router) {
   
 }
 @ViewChild(OlMapComponent) olMap:OlMapComponent;
 ngOnInit() {
  this.getControlZones();
}

getLatLongFromAddress(){
  // If adress is not supplied, use default value 'India'
  var address = this.controlZone.address || 'India';
  
  //var latLng =  JSON.parse(JSON.stringify(this.olMap.getLatLongFromAddress(address))); 
  var that = this;
  this.olMap.getLatLongFromAddress(address,function(latLng){
    if(latLng){
      var jLatLng = JSON.parse(JSON.stringify(latLng)); 
      that.controlZone.lat = jLatLng.lat;
      that.controlZone.lng = jLatLng.lng;
    }
  }); 

  

//console.log(latLng);

  // this.controlZone.lat = latLng.lat;
  // this.controlZone.lat = latLng.lng;
  
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
    this.controlZone = response[0]; 

    
        
      let marker = {
        lat : this.controlZone.lat,
        lng : this.controlZone.lng,
        description : "<b>Name </b>" + this.controlZone.name + "<br><b>Radius </b>" + this.controlZone.radius
      }
      

      this.markerData.push(marker);
  

  var area = {
    lat:20.5937,
    lng:78.9629,
    zoomLevel:6
  }

  this.olMap.renderMapMultipleMarkers(this.markerData,area);
  });
}

}
