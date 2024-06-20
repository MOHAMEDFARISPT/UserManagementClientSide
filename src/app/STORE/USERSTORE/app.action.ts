// auth.actions.ts
import { createAction, props } from '@ngrx/store';
import { UserModel } from '../../STORE/USERSTORE/app.model';




export const login = createAction('[Auth] Login',props<{ email: string; password: string }>());
export const loginSuccess = createAction('[Auth] Login Success',props<{ user: any }>());
export const loginFailure = createAction('[Auth] Login Failure',props<{ error: any }>());




export const getUserData = createAction('[UserModel] Get User Data');
export const getUserDataSuccess = createAction('[UserModel] Get User Data Success', props<{ user: UserModel }>())
export const getUserDataFailure = createAction('[UserModel] Get User Data Failure', props<{ error: any }>());
export const setUser = createAction('[UserModel] Set User', props<{ user: UserModel }>());

//userLogin
export const logout = createAction('logout');
export const logoutSuccess = createAction('logout success')
export const logoutFailure = createAction('logout Failure', props<{ error: string }>())

//Adminlogout
export const Adminlogout = createAction('[Adminlogout] Admin logout')


export const getUsers = createAction('[UserModel] Get Users');
export const getUsersSuccess = createAction('[userModel] listed users successfully', props<{ users: UserModel[] }>())
export const getusersFailure = createAction('[userModel] list users failed', props<{ error: any }>());


export const updateUser = createAction('[User] Update User', props<{ user: UserModel }>());
export const updateUserSuccess = createAction('[User] Update User Success', props<{ user: UserModel }>());
export const updateUserFailure = createAction('[User] Update User Failure', props<{ error: any }>());


//search user
export const searchStart = createAction('[search] search for user', props<{ searchTerm: string }>());
export const searchFailure = createAction('[Search] search Failure', props<{ error: string }>());

// deleteUser
export const deleteUser = createAction('[deleteuser] delete user', props<{ userId: number | string }>());
export const deleteUserSuccess = createAction('[deletesuccess] delete user successful', props<{ userId: string }>());

export const deleteUserFailure = createAction('[deletefailed] delete user failed', props<{ error: any }>());
