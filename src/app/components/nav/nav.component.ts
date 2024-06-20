import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {ErrorMessage, RegistrationResponse, SuccessMessage} from '../../interfaces/auth'
import {NotificationService} from '../../services/notification.service'
import {IsloginService} from '../../services/islogin.service'
import {  logout } from '../../STORE/USERSTORE/app.action'; 
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  
  constructor(
    public authService: AuthService ,
    private router:Router,
    private notificationService:NotificationService,
    private loginService: IsloginService,
    private store:Store
  ) {}
 
  isLoggedIn=false

 ngOnInit(): void {
  this.loginService.userSubject.subscribe(isLoggedIn => {
    this.isLoggedIn = isLoggedIn;
  });
}

logout() {
 
  this.store.dispatch(logout())

  }
 

   
 }




