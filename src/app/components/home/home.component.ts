import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../STORE/USERSTORE/app.state';
import { UserModel } from '../../STORE/USERSTORE/app.model';
import { selectUser } from '../../STORE/USERSTORE/app.selector';
import { Observable } from 'rxjs';
import { getUserData, logout } from '../../STORE/USERSTORE/app.action';
import { AuthService } from '../../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { ErrorMessage } from '../../interfaces/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  user$: Observable<UserModel | null>;
  selectedFile: File | undefined;
  imageUrl: string | undefined;
  userId: string | undefined | null;

  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.user$ = this.store.pipe(select(selectUser));
    this.store.dispatch(getUserData());

    // Subscribe to user$ to get the user ID
    this.user$.subscribe((user) => {
      if (user) {
        this.userId = user._id; 
        console.log('User ID set to:', this.userId); // Log the user ID
        this.userimageUrl();
      } else {
        console.error('User not found in the store.');
      }
    });
  }

  logout() {
    this.store.dispatch(logout());
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    this.updateProfileImage();
  }

  updateProfileImage() {
    if (!this.selectedFile) {
      console.error('No file selected.');
      return;
    }

    if (!this.userId) {
      console.error('User ID is not available.');
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('userId', this.userId); // Append the user ID to the form data

    this.authService.updateImage(formData, this.userId).subscribe({
      next: (response) => {
        this.notificationService.showMessage({ message: 'Profile Picture Updated' });
        this.imageUrl = response.imagePath;
      },
      error: (error: ErrorMessage) => {
        this.notificationService.handleError(error);
      }
    });
  }

  userimageUrl() {
    if (!this.userId) {
      console.error('User ID is not available when calling userimageUrl.');
      return;
    }
    
   
    this.authService.getUserImage(this.userId).subscribe({
      next: (response: any) => {
        this.imageUrl = response.url;
        
        console.log('Fetched image URL:', this.imageUrl);
      },
      error: (error) => {
        console.error('Error fetching user image:', error);
      }
    });
  }
}
