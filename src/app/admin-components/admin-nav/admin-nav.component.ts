import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Adminlogout } from '../../STORE/USERSTORE/app.action';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrl: './admin-nav.component.css'
})
export class AdminNavComponent {
  constructor(
    private store:Store
  ){

  }
  logout(){
    this.store.dispatch(Adminlogout())
  }



}
