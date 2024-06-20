
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {signupregistration ,RegistrationResponse} from '../../interfaces/auth'
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import {SuccessMessage} from '../../interfaces/auth'
import {ErrorMessage} from '../../interfaces/auth'
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  registrationform:any=  FormGroup;
  data: signupregistration = { name: '',username:'',email:'',password:'' };
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
    username: '',
    email: '',
    password: ''
  });
 
  
}
 


onSubmit() {
  if (this.registrationform.valid) {
    const user = this.registrationform.value;
    this.authService.Adduser(user).subscribe({
      next: (response: RegistrationResponse) => {
       
        const successMessage:SuccessMessage={message:response.message,}
        this.notificationService.showMessage(successMessage)
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
     
         
        const errorMessage: ErrorMessage = { error: err.error.message };
        this.notificationService.handleError(errorMessage);
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
}

