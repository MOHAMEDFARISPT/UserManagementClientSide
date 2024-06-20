import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {ErrorMessage, RegistrationResponse, SuccessMessage, signupregistration} from '../../interfaces/auth'
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
@Component({
  selector: 'app-admin-register-component',
  templateUrl: './admin-register-component.component.html',
  styleUrl: './admin-register-component.component.css'
})
export class AdminRegisterComponent {

  userlogin:boolean=false;
  registrationform:any=  FormGroup;
  data: signupregistration = { name: '',email:'',password:'' };
  responseMessage: any;


constructor(
  private formBuilder:FormBuilder,
 private router :Router,
private authService:AuthService,
private notificationService:NotificationService
){

}
ngOnInit(): void {
  
  this.registrationform= this.formBuilder.group({
   
    name: '',
    email: '',
    password: ''
  });
 
  
}
 


onSubmit() {
  if (this.registrationform.valid) {
    const Admin = this.registrationform.value;
    this.authService.Adminregister(Admin).subscribe({
      next: (response: RegistrationResponse) => {
       
        const successMessage:SuccessMessage={message:response.message,}
        this.notificationService.showMessage(successMessage)
        this.router.navigate(['/adminlogin']);
      },
      error: (err: any) => {
     
         
        const errorMessage: ErrorMessage = { error: err.error.message };
        this.notificationService.handleError(errorMessage);
        this.router.navigate(['/adminlogin']);
      }
    });
  
}

}
} 




