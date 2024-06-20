import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ErrorMessage } from '../../interfaces/auth';
import {SuccessMessage} from '../../interfaces/auth'
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import {signupregistration} from '../../interfaces/auth';
import { Store, select } from '@ngrx/store';
import strict from 'assert/strict';
import { AppState } from '../../STORE/USERSTORE/app.state';
import { getUserData,getUsers,deleteUser } from '../../STORE/USERSTORE/app.action';
import { selectUsers } from '../../STORE/USERSTORE/app.selector';
import { UserModel } from '../../STORE/USERSTORE/app.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrl: './admin-user-list.component.css'
})
export class AdminUserListComponent implements OnInit {
 
  users$:Observable<UserModel[] | null>



  constructor(
    private authService:AuthService,
    private notificationservice:NotificationService,
    private router:Router,
    private store:Store<AppState>
  ){}

ngOnInit(): void {

  this.users$ = this.store.pipe(select(selectUsers));
  console.log("this.users$",this.users$)
  this.store.dispatch(getUsers())





  
}

deleteUser(user: UserModel) { 
  console.log("user////", user);
  this.store.dispatch(deleteUser({ userId: user._id })); 
}







editUser(user: any): void {
 
  console.log(user._id);
  if (user._id) {
    const userId = user._id;
    console.log('iffffffff');
    this.router.navigate(['Edit', userId]);
  } else {
    this.notificationservice.handleError({ error: 'You can’t edit user data now' });
  }
}

}
