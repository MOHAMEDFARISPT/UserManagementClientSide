// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class AuthtockenService {
    constructor(private jwtHelper: JwtHelperService) {}
  
    
  }