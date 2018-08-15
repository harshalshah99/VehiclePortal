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
  
  constructor(private parentChildCommService: ParentChildCommService) { }

  ngOnInit() {
    this.setLoginPreferences();
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.setLoginPreferences();
  }

  setLoginPreferences(){
    this.parentChildCommService.setLoginPreferences();
    // debugger;
    // if (localStorage.getItem('currentUser')) {
    //   this.isUserLogin = true;
    // }
    // else{
    //   this.isUserLogin = false;
    // }
  }
}
