import { Component } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { Adminlogin, SuccessMessage,ErrorMessage } from '../../interfaces/auth';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ladminogin',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  userlogin:boolean=false
  loginForm:FormGroup;

  constructor(private fb: FormBuilder, private router:Router, private authService: AuthService,private notificationService:NotificationService) {
   
    this.loginForm = this.fb.group({
      email: '', 
      password: '', 
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const adminLoginData: Adminlogin = this.loginForm.value;
      console.log('Form Submitted', adminLoginData);
      this.authService.adminlogin(adminLoginData).subscribe({
        next: (response: any) => {
          console.log("response",response)
          const successMessage:SuccessMessage={message:response.message}
        
        this.notificationService.showMessage(successMessage)
        console.log("////////Here")
        this.router.navigate(['dashboard']);
        },
        error: (err: any) => {
         
          const errorMessage: ErrorMessage = { error: err.error.message };
          this.notificationService.handleError(errorMessage);
          this.router.navigate(['adminlogin']);
        }
      });
    } else {
     

      
    }
  }
  
  
}

