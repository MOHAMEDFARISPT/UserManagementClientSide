import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,of, catchError, throwError } from 'rxjs';
import {RegistrationResponse} from '.././interfaces/auth'
import {UserLogin} from '../interfaces/auth'
import {signupregistration} from '../interfaces/auth'
import {loginResponse} from '../interfaces/auth'
import { tap  } from 'rxjs/operators';
import {AdminloginResponse} from '../interfaces/auth'
import {Adminlogin} from '../interfaces/auth'
import { User } from '../interfaces/auth'; 
import { UserModel } from '../STORE/USERSTORE/app.model';

import {  HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  
  private regUrl='http://localhost:4000/api/users/register'
  private loginUrl='http://localhost:4000/api/users/login'
  private logoutUrl='http://localhost:4000/api/users/logout'
  private AdminloginUrl='http://localhost:4000/api/Admin/Adminlogin'
  private AdminregisterUrl='http://localhost:4000/api/Admin/Adminregistration'
  private Adduserurl='http://localhost:4000/api/Admin/Adduser'
  private getuserurl='http://localhost:4000/api/Admin/getuser'
private loaduserDataUrl='http://localhost:4000/api/users/loaduser'
private updateuserUrl='http://localhost:4000/api/admin/updateuser'
private deleteUrl='http://localhost:4000/api/Admin/deleteuser'
private profileUrl='http://localhost:4000/api/users/profile';
private getuserprofuleUrl='http://localhost:4000/api/users/user-profile'
// private cloudName = 'dpzw36smt';
// private cloudinaryUrl = `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`; 

  constructor(private http:HttpClient){}
  userId?:string | null


  getUserImage(userId:string){
   
    return this.http.get(`${this.getuserprofuleUrl}/${userId}`)
  }

  
   updateImage(file: FormData, userId: string): Observable<any> {
    const params = new HttpParams().set('userId', userId);
    console.log('Params with userId:', params.toString()); 
    
    return this.http.post(`${this.profileUrl}`, file,{params});
  }










  register(user: signupregistration): Observable<RegistrationResponse>{
    return this.http.post<RegistrationResponse>(`${this.regUrl}`, user,{responseType:'json'})
   
  }
  login(credentials: UserLogin): Observable<loginResponse> {
    console.log("credentials", credentials);
    return this.http.post<loginResponse>(this.loginUrl, credentials, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'json'
    }).pipe(
      tap((response: loginResponse) => console.log('Login response:', response)),
      catchError(error => {
        console.error('Error occurred during login:', error);
        throw error; // Re-throw the error to propagate it
      })
    );
  }

  
  logout(){
    localStorage.removeItem('token');
    return  of(true);
  }
   
 
  
  private storeToken(token:string,isAdmin:boolean):void{
    console.log(token,isAdmin)
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('isAdmin', String(isAdmin));
    }else{
      console.log("local storage error ")
    }
  }


  getheaders() {
    const userToken = localStorage.getItem('token');
  
    if (userToken) {
      return new HttpHeaders({
        Authorization: `Bearer ${userToken}`
      });
    } else {
      return new HttpHeaders();
    }
  }












 
//update user
  updateUser(user: UserModel): Observable<UserModel> {
    console.log("//update function api endpoint",user)
    console.log("this.updateuserUrl",this.updateuserUrl)
    return this.http.put<UserModel>(`${this.updateuserUrl}/${user._id}`, user);
  }





  getUserData(): Observable<any> {
    const headers = this.getheaders(); 
  
 
    return this.http.get(`${this.loaduserDataUrl}`, { headers }).pipe(
      tap((response: any) => console.log('User profile response:', response)),
      
      catchError(error => {
        console.error('Error occurred while fetching user profile:', error);
        throw error; // Re-throw the error to propagate it
      })
    );
  }






  

  Adminregister(user: signupregistration): Observable<RegistrationResponse>{
    return this.http.post<RegistrationResponse>(`${this.AdminregisterUrl}`, user,{responseType:'json'})
   
  }


adminlogin(Admincredentials:Adminlogin): Observable<AdminloginResponse> {
  console.log("Admincredentials",Admincredentials)
  console.log("from here")
  return this.http.post<AdminloginResponse>(this.AdminloginUrl, Admincredentials, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }).pipe(
    tap((response: AdminloginResponse) => console.log('Login response:', response)),
    catchError(error => {
      console.error('Error occurred during login:', error);
      throw error; // Re-throw the error to propagate it
    })
  );
}


Adduser(user: signupregistration): Observable<RegistrationResponse>{
  return this.http.post<RegistrationResponse>(`${this.Adduserurl}`, user,{responseType:'json'})
 
}





//search for users in adminside
getUsers(searchQuery: string = '', isQuery: boolean = false): Observable<any> {
  const url = isQuery ? `${this.getuserurl}?search=${searchQuery}` : this.getuserurl;
  console.log("url", url);
  // const headers = this.getheaders();
  return this.http.get(url).pipe(
    catchError(error => {
      console.error('Error fetching users', error);
      return throwError(error);
    })
  );
}


//deleteuser
deleteUser(userId: string): Observable<any> {
  return this.http.delete(`${this.deleteUrl}/${userId}`);
}















  isAuthenticate(){
    if(localStorage!==undefined){
      const token = localStorage.getItem('token')
      if (token) {
        return !!token
      } else {
        return false
      }
    } else {
      return false
    }
    }
  
  
  
  
 
}
