import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProfileserviceService {


 
  // private uploadUrl = 'http://localhost:4000/api/users/uploadImage';
  // constructor(private http:HttpClient) { }

  // uploadFile(file: File): Observable<any> {
  //   console.log("file",file)
  //   const formData = file.name;
  //   alert(formData)
  //   return this.http.post(this.uploadUrl, formData, {
  //     headers: new HttpHeaders({
  //       // Any headers you need to include, e.g., authorization
  //     })
  //   });
  // }
}
