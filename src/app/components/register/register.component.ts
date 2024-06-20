
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {signupregistration ,RegistrationResponse} from '../../interfaces/auth'
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import {SuccessMessage} from '../../interfaces/auth'
import {ErrorMessage} from '../../interfaces/auth'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent  implements OnInit{
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
    this.authService.register(user).subscribe({
      next: (response: RegistrationResponse) => {
        alert(JSON.stringify(response.message))
       
        const successMessage:SuccessMessage={message:response.message,}
        this.notificationService.showMessage(successMessage)
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
     
         
        const errorMessage: ErrorMessage = { error: err.error.message };
        this.notificationService.handleError(errorMessage);
        this.router.navigate(['/login']);
      }
    });
  }
}
}







