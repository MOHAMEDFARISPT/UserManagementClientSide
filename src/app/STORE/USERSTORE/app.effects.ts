// auth.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from './app.action';
import { catchError, map, mergeMap, tap,switchMap } from 'rxjs/operators';

import { of,concat } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { loginResponse } from '../../interfaces/auth';
import { response } from 'express';
import { UserModel } from './app.model';
import { error } from 'console';



@Injectable()
export class loginEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) { }
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(action =>
        this.authService.login({ email: action.email, password: action.password }).pipe(
          map((response: loginResponse) => {

            localStorage.setItem('token', response.data.token);
            return AuthActions.loginSuccess({ user: response.data.user });
          }),

          catchError(error => of(AuthActions.loginFailure({ error: error.message })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(action => {
        const successMessage = { message: 'Login Successful', title: 'Login' };
        this.notificationService.showMessage(successMessage);
        this.router.navigate(['/home']);
      })
    ), { dispatch: false }
  );


  getuserData$=createEffect(()=>
    this.actions$.pipe(
      ofType(AuthActions.getUserData),
      mergeMap(()=>
      this.authService.getUserData().pipe(
        map((user:UserModel)=>AuthActions.getUserDataSuccess({user})),
        catchError(error =>of(AuthActions.getUserDataFailure({ error })))
      )
    )
    )
  );
  

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() =>
        this.authService.logout().pipe(
          map(() =>
            AuthActions.logoutSuccess(),
            this.notificationService.showMessage({ message: 'Logout successfully', title: 'success' })
          
          ),
          catchError(error => of(AuthActions.logoutFailure({ error })))
        )
      ),
      tap(() => {
        this.router.navigate(['/login']);
      })
    )
  );
  




  //loadusers for adminside user listing

  getUsers$=createEffect(()=>
    this.actions$.pipe(
      ofType(AuthActions.getUsers),
      mergeMap(()=>
      this.authService.getUsers().pipe(
        tap(users => console.log('Response data:', users)),
        map(users=>AuthActions.getUsersSuccess({users})),
        catchError(error => of(AuthActions.getusersFailure({ error })))

      ))

    )
  )

//search users

  searchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.searchStart),
      switchMap(({ searchTerm }) =>
        this.authService.getUsers(searchTerm, true).pipe(
          map((response: any) => {
            console.log("responsebackend",response)
            const userlist = response || [];
            console.log("Search userslist ", userlist)
            return AuthActions.getUsersSuccess({ users:userlist });
          }),
          catchError(error => {
            this.notificationService.handleError({ error:'user not found' });
            return of(AuthActions.searchFailure({ error: error.message }));
          })
        )
      )
    )
  );


  //delete user
  //deleteUsers

deleteUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.deleteUser),
    mergeMap((action: { userId: any; }) =>
      this.authService.deleteUser(action.userId).pipe(
        map(() => AuthActions.deleteUserSuccess({ userId: action.userId })),
        catchError(error => of(AuthActions.deleteUserFailure({ error })))
      )
    )
  )
);









//update useerdata from edit user
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateUser),
      mergeMap(action =>
        this.authService.updateUser(action.user).pipe(
          
          map(user => AuthActions.updateUserSuccess({ user })),
          catchError(error => of(AuthActions.updateUserFailure({ error })))
        )
      )
    )
  );

  updateUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.updateUserSuccess),
        tap(() => {
          this.notificationService.showMessage({message:'user updated suucessfully',title:'success'});
        
            this.router.navigate(['dashboard']); // Navigate to the home page
        
        })
      ),
    { dispatch: false }
  );

  updateUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.updateUserFailure),
        tap(action => {
          this.notificationService.handleError({error:'user updation failes'});
        })
      ),
    { dispatch: false }
  );
}










  

