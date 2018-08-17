import { Component, OnInit } from '@angular/core';

import { ParentChildCommService } from '../ParentChildCommService';

import * as sbaJS from './master-page.js';

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.css'],
  providers: [ParentChildCommService]
})
export class MasterPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.setLoginPreferences();

    sbaJS.applySBAdminJS();

  }

  logout(){
    localStorage.removeItem('currentUser');
    this.setLoginPreferences();
  }

  setLoginPreferences(){
    ParentChildCommService.setLoginPreferences();
  }

}
