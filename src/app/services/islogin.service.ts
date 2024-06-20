import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsloginService {
  private isLoggedIn = false;
  userSubject = new Subject<boolean>();

  login() {
    this.isLoggedIn = true;
    this.userSubject.next(true);
  }

  logout() {
    this.isLoggedIn = false;
    this.userSubject.next(false);
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

}
