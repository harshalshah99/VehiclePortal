import { Component, OnInit, ViewContainerRef, ViewChild  } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as global from '../../shared/global'
import { ParentChildCommService } from './../../shared/ParentChildCommService';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { OlMapComponent } from './../../shared/ol-map/ol-map.component';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent implements OnInit {
  currentUserDetails = JSON.parse(JSON.stringify(ParentChildCommService.currentUserDetails));
  deviceDetail = { lat : 0, lng:0, manufacturer:'', model:''};
  markerData = [];
  deviceId: string;
  constructor(private http: HttpClient,private spinner: NgxSpinnerService,private toastr: ToastrService,
    private router: Router, private route: ActivatedRoute) {
   
 }
 @ViewChild(OlMapComponent) olMap:OlMapComponent;
  ngOnInit() {
    this.deviceId = this.route.snapshot.paramMap.get('id');
    this.getdeviceDetails();
  }

  getdeviceDetails() {
    var url = global.BASE_API_URL + "device/device_details";
    var params = { uid : this.currentUserDetails.user.uid , device_unique_id: this.deviceId };
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
      this.deviceDetail = response; 

      let marker = {
        lat : this.deviceDetail.lat,
        lng : this.deviceDetail.lng,
        description : "<b>Manufacturer </b>" + this.deviceDetail.manufacturer + "<br><b>Model </b>" + this.deviceDetail.model
      };

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
