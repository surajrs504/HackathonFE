import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {
  MatDialog,
  MatDialogModule,
 
} from '@angular/material/dialog';
import { animate, style, transition, trigger } from '@angular/animations';
import { ProfilePopupComponent } from '../../../../shared/components/profile-popup/profile-popup.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-authenticated',
  standalone: true,
  imports: [RouterModule, MatSidenavModule,FormsModule,MatInputModule, CommonModule, MatIconModule, MatDialogModule,MatFormFieldModule],
  templateUrl: './authenticated.component.html',
  styleUrl: './authenticated.component.scss',
  animations: [
    trigger('fade', [
      // Fade In
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms 0s', style({ opacity: 1 }))
      ]),
      // Fade Out
    
    ])
  ]
})
export class AuthenticatedComponent {
  isExpanded: boolean = false;
  menuItems: any = [
   
    {
      title: 'Dashboard',
      icon: 'bar_chart_4_bars',
      routeLink: 'dashboard',
    },
    {
      title: 'Mail Box',
      icon: 'mail',
      routeLink: 'mailbox',
    },
  ];
  readonly dialog = inject(MatDialog);
  handleShowProfile(){
    const dialogRef = this.dialog.open(ProfilePopupComponent, {
     
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     
    });
  
  }
}
