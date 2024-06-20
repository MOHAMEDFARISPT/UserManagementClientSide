import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import {AdminLoginComponent} from './admin-components/Admin-login/admin-login.component'
import { AdminRegisterComponent } from './admin-components/admin-register-component/admin-register-component.component';
import { AdminUserListComponent } from './admin-components/admin-user-list/admin-user-list.component';
import { CreateUserComponent } from './admin-components/create-user/create-user.component';
import { EditUserComponent } from './admin-components/edit-user/edit-user.component';
import {AuthGuard} from './guards/auth.guard'


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect to login on site access
  { path: 'login', component: LoginComponent },
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  { path: 'register', component: RegisterComponent },
  {path :'adminlogin',component:AdminLoginComponent},
  {path:'AdminRegister',component:AdminRegisterComponent},
  {path:'dashboard',component:AdminUserListComponent},
  {path:'Adduser',component:CreateUserComponent},
  {path:'Edit/:userId',component:EditUserComponent},
  { path: '**', redirectTo: 'login', pathMatch: 'full' }, // Redirect to login for unknown routes


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
