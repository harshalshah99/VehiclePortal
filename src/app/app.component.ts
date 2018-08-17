import { Component, OnInit } from '@angular/core';

import { ParentChildCommService } from './shared/ParentChildCommService';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ParentChildCommService]
})
export class AppComponent implements OnInit {

  isUserLogin = false;
  
  constructor() { }

  ngOnInit() {
    ParentChildCommService.isUserLogin.subscribe(message => this.isUserLogin = message);
    ParentChildCommService.setLoginPreferences();
  }

}
