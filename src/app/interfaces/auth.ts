export interface    signupregistration{
    name: string;
    username?: string;
    email:string;
    password:string
   
}
export interface User{
    id:string,
    name:string,
    username:string,
    email:string,
    profileImage:string,
    isAdmin:boolean
}
export interface UserLogin{
    email:string,
    password:string
}
export interface loginResponse{
    status: number;
    message: string;
    data: any;
}
export interface AdminloginResponse{
    status: number;
    message: string;
    data: any;
}

export interface SuccessMessage {
    message?: string;
    title?: string;
  }
  
  // Interface for error handling
  export interface ErrorMessage {
    error?: any;
  }

export interface RegistrationResponse {
    status: number;
    message: string;
    data: any;
  }

  export interface Adminlogin{
    email:string,
    password:string
  }


