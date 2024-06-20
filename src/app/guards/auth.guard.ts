import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { NotificationService } from '../services/notification.service';
interface DecodedToken {
  exp: number;
  iat: number;
  // Add other properties as needed
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,private notificationService:NotificationService) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    
    if (token) {
      const decodedToken: DecodedToken = jwtDecode(token);

      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp < currentTime) {
        this.notificationService.showMessage({message:'please login',title:'loggedout'})
        this.router.navigate(['/login']);

        return false;
      }

      return true;
    }else{
      this.notificationService.showMessage({message:'please login',title:'loggedout'})
      this.router.navigate(['/login'])
    }
    this.notificationService.showMessage({message:'please login',title:'loggedout'})
    this.router.navigate(['/login']);
    return false;
  }
}
