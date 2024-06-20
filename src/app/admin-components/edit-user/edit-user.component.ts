import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import  {AuthService} from '../../services/auth.service'
import {signupregistration} from '../../interfaces/auth'
import { Store ,select} from '@ngrx/store';
import { getUsers,updateUser } from '../../STORE/USERSTORE/app.action';
import { AppState } from '../../STORE/USERSTORE/app.state';
import { selectUsers } from '../../STORE/USERSTORE/app.selector';
import { Observable } from 'rxjs';
import { UserModel } from '../../STORE/USERSTORE/app.model';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user$: Observable<UserModel | null>;
  editForm: FormGroup;

  userId: string | null = null;
  

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService:AuthService,
    private store:Store<AppState>
  )


   { 

    this.editForm = this.fb.group({
      name: [''],
      email: [''],
      username: ['']
    });
   }

  ngOnInit(): void {
   
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.store.dispatch(getUsers());


 // Fetch user data based on userId
 this.store.pipe(select(selectUsers)).subscribe(users => {
  const user = users?.find(user => user._id === this.userId) || null;
  if (user) {
    this.editForm.patchValue({
      name: user.name,
      email: user.email,
      username: user.username
    });
  }
});




  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedUser = {
        ...this.editForm.value,
        _id: this.userId
      };
  
      // Dispatch an action to update the user in the store
      this.store.dispatch(updateUser({ user: updatedUser }));
      this.router.navigate(['dashboard']);
      console.log('Updated user:', updatedUser);
    }
  }
  
 
  }
    
  


     
  

 

