import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ParentChildCommService {

  static isUserLogin = new Subject<boolean>();
  static currentUserDetails = {};

  // Service message commands
  static setUserLogin(val: boolean) {
    this.isUserLogin.next(val);
  }

  // Service message commands
  static setLoginPreferences() {
    if (localStorage.getItem('currentUser')) {
      this.setUserLogin(true);
      debugger;
      this.currentUserDetails = JSON.parse(localStorage.getItem('currentUser'));
    }
    else {
      this.setUserLogin(false);
      this.currentUserDetails = {};
    }
  }

}