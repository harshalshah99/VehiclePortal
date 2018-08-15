import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Input } from '@angular/core';
@Injectable()
export class ParentChildCommService {

  isUserLogin = new Subject<boolean>();

 // isUserLogin$ = this.isUserLogin.asObservable();

  // Service message commands
  setUserLogin(val: boolean) {
    this.isUserLogin.next(val);
  }

  // Service message commands
  setLoginPreferences() {
    debugger;
    if (localStorage.getItem('currentUser')) {
      this.setUserLogin(true);
    }
    else {
      this.setUserLogin(false);
    }
  }

}