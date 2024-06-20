// notification.service.ts
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {SuccessMessage} from '../interfaces/auth'
import {ErrorMessage} from '../interfaces/auth'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
 
  constructor(private toastr: ToastrService,private router:Router) {}

showMessage({ message, title = 'Success' }: SuccessMessage) {

    this.toastr.success(message, title);
   
     // Delay navigation to home page to allow Toastr message to show
   
    
   // Adjust the delay time as needed (2000 milliseconds = 2 seconds)

  }
  // Function to handle error
  handleError({ error }: ErrorMessage) {
   
    const errorMessage = error
    this.toastr.error(errorMessage, 'Error');
  }
}

