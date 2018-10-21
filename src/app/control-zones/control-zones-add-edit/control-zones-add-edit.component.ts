import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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
    address:'',
    lat:0.0,
    lng:0.0,
    unique_id:''
  };
  markerData = [];
  controlZoneId: string;
  mode = 'EDIT';
  constructor(private http: HttpClient,private spinner: NgxSpinnerService,private toastr: ToastrService,
    private router: Router, private route: ActivatedRoute) {
   
 }
 @ViewChild(OlMapComponent) olMap:OlMapComponent;
 ngOnInit() {
  this.controlZoneId = this.route.snapshot.paramMap.get('id');

  if(this.controlZoneId == '0')
  {
    this.mode = 'ADD';
  }
  else{
    this.mode = 'EDIT';
  }

  this.getControlZone();
}

getLatLongFromAddress(){
  // If adress is not supplied, use default value 'India'
  var address = this.controlZone.address || 'India';
  
  //var latLng =  JSON.parse(JSON.stringify(this.olMap.getLatLongFromAddress(address))); 
  var that = this;
  this.spinner.show();
  this.olMap.getLatLongFromAddress(address,function(data){
    that.spinner.hide();
    if(data){
     if(data.length > 0)
     {
      that.controlZone.lat = parseFloat(data[0].lat);
      that.controlZone.lng = parseFloat(data[0].lon);

      let marker = {
        lat : that.controlZone.lat,
        lng : that.controlZone.lng,
        description : "<b>Name </b>" + that.controlZone.name + "<br><b>Radius </b>" + that.controlZone.radius
      }
      
       that.markerData = [];
    that.markerData.push(marker);
  

        var area = {
          lat:20.5937,
          lng:78.9629,
          zoomLevel:6
        }

        that.olMap.renderMapMultipleMarkers(that.markerData,area);
    //that.getLatLongFromAddressTemp(marker);
      that.toastr.success('Latitude Longitude for given address found and pointed to map.');
     }
     else{
      that.toastr.error('Invalid address OR Something bad happened; please try again later.');
     }
    
    }
  }); 
  
}

getControlZone() {
  var url = global.BASE_API_URL + "geofence/get_geofence";
  var params = { uid : this.currentUserDetails.user.uid, unique_id : this.controlZoneId };
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
    this.controlZone = response;
   

    
        
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

getLatLongFromAddressTemp(marker2){
  // let marker = {
  //   lat : 22.3511148,
  //   lng : 78.6677428,
  //   description : "<b>Name </b>" + this.controlZone.name + "<br><b>Radius </b>" + this.controlZone.radius
  // }

  let marker = {
    lat : 22.3045769,
    lng : 70.802161,
    description : "<b>Name </b>" + this.controlZone.name + "<br><b>Radius </b>" + this.controlZone.radius
  }
  
this.markerData = [];
  this.markerData.push(marker);


          var area = {
          lat:20.5937,
          lng:78.9629,
          zoomLevel:6
          }
      this.olMap.renderMapMultipleMarkers(this.markerData,area);
}
}
