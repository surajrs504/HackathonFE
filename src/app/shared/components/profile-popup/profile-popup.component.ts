import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../../core/services/auth/auth.service';
@Component({
  selector: 'app-profile-popup',
  standalone: true,
  imports: [MatIconModule,MatButtonModule,MatCardModule],
  templateUrl: './profile-popup.component.html',
  styleUrl: './profile-popup.component.scss'
})
export class ProfilePopupComponent {
  email="Madhusudan.Sharma@novigo-solutions.com"
  private authSerivce=inject(AuthService)
   
  logout(){
    this.authSerivce.logout();
  }
}
