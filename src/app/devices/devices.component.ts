import { Component, OnInit, ViewContainerRef, ViewChild  } from '@angular/core';
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
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  currentUserDetails = JSON.parse(JSON.stringify(ParentChildCommService.currentUserDetails));
  deviceData = [];
  markerData = [];
  constructor(private http: HttpClient,private spinner: NgxSpinnerService,private toastr: ToastrService,
    private router: Router) {
   
 }
 @ViewChild(OlMapComponent) olMap:OlMapComponent;
  ngOnInit() {
    this.getDevices();
  }

  getDevices() {
    var url = global.BASE_API_URL + "device/user_devices";
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
      this.deviceData = response; 
      ParentChildCommService.devices = this.deviceData;
      //this.deviceData = [{"unique_id":"oSQTrTH","uid":"8eYdkKi","device_type":1,"manufacturer":"motorola","model":"XT1068","os_version":"6.0","os_vendor":"Android","serial_number":"ZX1D63RHJQ","cpu_model":"ARMv7 Processor rev 3 (v7l)","cpu_speed":"1190","cpu_cores":"4","ram_size":"96","imei":"353326063457875","sim_serial_no":"8991000900115066923\n","subscriber_id":"404490190502515","network_operator":"airtel","mac_address":"F8:CF:C5:AA:48:55","active":1,"lost":0,"notifications":0,"lat":null,"lng":null,"in_geofence":0,"geofence_id":null,"last_ping_date":1529000222,"command":"","created_date":1528999573,"updated_date":1530627420,"location_service":0,"network_provider":0,"gps_provider":0},{"unique_id":"oSQTrTH","uid":"8eYdkKi","device_type":1,"manufacturer":"motorola","model":"XT1068","os_version":"6.0","os_vendor":"Android","serial_number":"ZX1D63RHJQ","cpu_model":"ARMv7 Processor rev 3 (v7l)","cpu_speed":"1190","cpu_cores":"4","ram_size":"96","imei":"353326063457875","sim_serial_no":"8991000900115066923\n","subscriber_id":"404490190502515","network_operator":"airtel","mac_address":"F8:CF:C5:AA:48:55","active":1,"lost":0,"notifications":0,"lat":null,"lng":null,"in_geofence":0,"geofence_id":null,"last_ping_date":1529000222,"command":"","created_date":1528999573,"updated_date":1530627420,"location_service":0,"network_provider":0,"gps_provider":0}];
    
      for (let device of  this.deviceData) {
        
        let marker = {
          lat : device.lat,
          lng : device.lng,
          description : "<b>Manufacturer </b>" + device.manufacturer + "<br><b>Model </b>" + device.model
        };

        this.markerData.push(marker);
    }

    var area = {
      lat:20.5937,
      lng:78.9629,
      zoomLevel:6
    }

    this.olMap.renderMapMultipleMarkers(this.markerData,area);
    });
  }
}
