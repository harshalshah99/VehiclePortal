import { Component, OnInit } from '@angular/core';
import * as rm from './ol-map.js';

@Component({
  selector: 'app-ol-map',
  templateUrl: './ol-map.component.html',
  styleUrls: ['./ol-map.component.css']
})
export class OlMapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }

  renderMap(lat,lng){
    rm.renderMap(lat,lng);
  }

}
