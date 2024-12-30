import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile-popup',
  standalone: true,
  imports: [MatIconModule,MatButtonModule],
  templateUrl: './profile-popup.component.html',
  styleUrl: './profile-popup.component.scss'
})
export class ProfilePopupComponent {

}
