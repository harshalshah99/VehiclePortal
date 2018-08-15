import { Component, OnInit } from '@angular/core';
import { ParentChildCommService } from './../../shared/ParentChildCommService';

@Component({
  selector: 'app-navigation',
  templateUrl: './app-navigation.component.html',
  styleUrls: ['./app-navigation.component.css'],
  providers: [ParentChildCommService]
})
export class AppNavigationComponent implements OnInit {

  isUserLogin = false;

  constructor(private parentChildCommService: ParentChildCommService) { }

  ngOnInit() {
    this.parentChildCommService.isUserLogin.subscribe(message => this.isUserLogin = message);
    this.parentChildCommService.setLoginPreferences();
    
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.parentChildCommService.setLoginPreferences();
  }


}
