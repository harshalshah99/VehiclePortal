
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit, ViewContainerRef, ViewChild  } from '@angular/core';
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
  deviceId : string;
  deviceDetails = {};
  constructor(  private route: ActivatedRoute) { 
  
  }
  ngOnInit() {
    this.deviceId = this.route.snapshot.paramMap.get('id');
      // this.deviceDetails = ParentChildCommService.devices.filter(
      //   device => device.deviceId === this.deviceId);
  }

}
