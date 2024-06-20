import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {ErrorMessage, RegistrationResponse, SuccessMessage} from '../../interfaces/auth'
import {NotificationService} from '../../services/notification.service'
import { ToastrService } from 'ngx-toastr';
import { AppState } from '../../STORE/USERSTORE/app.state';
import { Store } from '@ngrx/store';
import { login } from '../../STORE/USERSTORE/app.action';
import { selectLoading } from '../../STORE/USERSTORE/app.selector';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginError: string | null = null;
  loading$  = this.store.select(selectLoading)
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private toasterservice:ToastrService
  ){}
 


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: '', 
      password: ''
    });
  }

  
    onSubmit(): void {
      if (this.loginForm.valid) {
        const loginData = this.loginForm.value;
        this.store.dispatch(login({ email: loginData.email, password: loginData.password }));
      }
    }
  }


