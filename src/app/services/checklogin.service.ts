
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })

  export class LoginService{
    private isLoggedIn = false;
    userSubject = new Subject<boolean>();

  }





