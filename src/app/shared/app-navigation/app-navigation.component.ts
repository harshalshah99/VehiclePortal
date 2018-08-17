import { Component, OnInit } from '@angular/core';
import { ParentChildCommService } from './../../shared/ParentChildCommService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './app-navigation.component.html',
  styleUrls: ['./app-navigation.component.css'],
  providers: [ParentChildCommService]
})
export class AppNavigationComponent implements OnInit {

  isUserLogin = false;

  constructor(private router: Router) { }

  ngOnInit() {
    ParentChildCommService.isUserLogin.subscribe(message => this.isUserLogin = message);
    ParentChildCommService.setLoginPreferences();
  }

  logout(){
    localStorage.removeItem('currentUser');
    ParentChildCommService.setLoginPreferences();
    this.router.navigate(['/UserLogin']);
  }


}
