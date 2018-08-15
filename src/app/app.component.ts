import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isUserLogin = false;
  
  constructor() { }

  ngOnInit() {
    this.setLoginPreferences();
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.setLoginPreferences();
  }

  setLoginPreferences(){
    if (localStorage.getItem('currentUser')) {
      this.isUserLogin = true;
    }
    else{
      this.isUserLogin = false;
    }
  }
}
