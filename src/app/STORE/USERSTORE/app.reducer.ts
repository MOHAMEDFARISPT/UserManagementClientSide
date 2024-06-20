// auth.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './app.action';
import {  initialState } from './app.state';
import {getUserDataSuccess,getUserDataFailure} from  './app.action'
import { state } from '@angular/animations';
import { error } from 'console';

console.log("actioonil ethy")
export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    loading:true,
    error: null
  })),
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    users:[],
    loading:false,
    error: null
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading:false,
    users:[],
    user: null,
    error
  })),
  on(AuthActions.getUserDataSuccess,(state,{user})=>{
   console.log("getUserDataSuccess",state);
   console.log("getUserDataSuccess",user)
   return {
    ...state,
    user,
    loading:false,
    users:[],
    error:null
   }
   
    

  }),
  on(AuthActions.getUserDataFailure, (state, { error }) => { 
    console.log("getUserDataFailure",state);
   console.log("getUserDataFailure",error)
    return{
       ...state,
        error

    
     }}),

     on(AuthActions.loginFailure, (state, { error }) => ({
      ...state,
      error
    })),
     
    on(AuthActions.logoutSuccess,(state)=>({
 ...state,
 user:initialState.user,
 error:" "

    })),
    on(AuthActions.logoutFailure,(state)=>({
      ...state,
      user:initialState.user,
      error:" "

    })),
    on(AuthActions.logoutFailure,(state,{error})=>({
      ...state,
      error

    })),
    on(AuthActions.getUsersSuccess,(state,{users})=>({
      ...state,
      users:users,
      loading:false,
      error:null

    })),
    on(AuthActions.getusersFailure,(state,{error})=>({
      ...state,
       error
    })),
    on(AuthActions.updateUserSuccess, (state, { user }) => ({
      ...state,
      users: state.users.map(u => u._id === user._id ? user : u)
    })),
    on(AuthActions.updateUserFailure,(state,{error})=>({
      ...state,
      error
    })),
    on(AuthActions.deleteUser, (state) => ({
       ...state,
        loading: true,
         error: undefined
     })),
  on(AuthActions.deleteUserSuccess, (state, { userId }) => ({
    ...state,
    loading: false,
    users: state.users.filter((user) => user._id !== userId), // Filter deleted user
  })),
  on(AuthActions.deleteUserFailure, (state, { error }) => ({
     ...state, 
     loading: false,
      error 
    }))
);
    

  
  
   
  

     


