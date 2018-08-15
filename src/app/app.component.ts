import { Component, OnInit } from '@angular/core';

import { ParentChildCommService } from './shared/ParentChildCommService';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ParentChildCommService]
})
export class AppComponent implements OnInit {

  //isUserLogin = false;
  
  constructor() { }

  ngOnInit() {
    this.setLoginPreferences();
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.setLoginPreferences();
  }

  setLoginPreferences(){
    ParentChildCommService.setLoginPreferences();
  }
}
