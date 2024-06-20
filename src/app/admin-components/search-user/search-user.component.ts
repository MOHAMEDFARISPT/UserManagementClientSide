import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import {searchStart} from '../../STORE/USERSTORE/app.action'
@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrl: './search-user.component.css'
})
export class SearchUserComponent {


  constructor(
    private authService:AuthService,
    private store:Store

  ){}





  onSearch(searchquery:string){
    console.log(searchquery)
    this.store.dispatch(searchStart({searchTerm:searchquery}))
  }
}
