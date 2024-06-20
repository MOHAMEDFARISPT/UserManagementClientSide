import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { NavComponent } from './components/nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './Interceprtors/jwt.interceptor';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { JwtModule } from '@auth0/angular-jwt';
import {AdminLoginComponent} from './admin-components/Admin-login/admin-login.component';
import { AdminNavComponent } from './admin-components/admin-nav/admin-nav.component';
import { AdminRegisterComponent } from './admin-components/admin-register-component/admin-register-component.component'
import {AdminUserListComponent} from './admin-components/admin-user-list/admin-user-list.component'
import { CreateUserComponent } from './admin-components/create-user/create-user.component';
import {SearchUserComponent} from './admin-components/search-user/search-user.component'
import {EditUserComponent}from './admin-components/edit-user/edit-user.component'
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { authReducer } from './STORE/USERSTORE/app.reducer';
import { loginEffects } from './STORE/USERSTORE/app.effects';
import { AuthService } from './services/auth.service';
import { ErrorHandlerInterceptor } from './Interceprtors/error.interceptor';



export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    FooterComponent,
    AdminLoginComponent,
    AdminNavComponent,
    AdminRegisterComponent,
    AdminUserListComponent,
    CreateUserComponent,
    SearchUserComponent,
    EditUserComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    ToastrModule.forRoot({
      closeButton: true,
      tapToDismiss: true,
      newestOnTop: true,
      easing: 'ease-in',
      toastClass: 'ngx-toastr',
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['yourapi.com'], // Adjust this to your API's domain
        disallowedRoutes: ['yourapi.com/auth/'], // Adjust this to routes that shouldn't send the token
      },
    }),
    BrowserAnimationsModule,
    StoreModule.forRoot({ auth: authReducer }),
    EffectsModule.forRoot([loginEffects]),
    
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true }
    
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
