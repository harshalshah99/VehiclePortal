import { Component, OnInit,  EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './app-navigation.component.html',
  styleUrls: ['./app-navigation.component.css']
})
export class AppNavigationComponent implements OnInit {

  @Input() isUserLogin: boolean;
  @Output() setLoginPreferencesBase = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.setLoginPreferences();
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.setLoginPreferences();
  }

  setLoginPreferences(){
    this.setLoginPreferencesBase.emit();
  }
}
