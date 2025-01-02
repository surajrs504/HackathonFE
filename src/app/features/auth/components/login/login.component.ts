import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';
import {
  AuthenticationResult,
  Configuration,
  InteractionRequiredAuthError,
  PublicClientApplication,
} from '@azure/msal-browser';
import {
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MsalService,
} from '@azure/msal-angular';
const msalConfig: Configuration = {
  auth: {
    clientId: 'c3bea760-6fce-451b-bcc9-c62e1fa87d70', // Application (client) ID from Azure
    authority:
      'https://login.microsoftonline.com/d25e697e-9987-4146-87ba-800be6fd457c', // Directory (tenant) ID from Azure
    redirectUri: 'http://localhost:4200/a/mailbox', // Your app's redirect URI
  },
  cache: {
    cacheLocation: 'localStorage', // Choose 'sessionStorage' or 'localStorage'
    storeAuthStateInCookie: false, // Set to true for IE11 support
  },
};
export function MSALInstanceFactory() {
  return new PublicClientApplication(msalConfig);
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [
    MsalService,
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useValue: {
        loginFailedRoute: '/login',
      },
    },
  ],
})
export class LoginComponent {
  //create a reactive form with email and passsword as controls
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  public loginError: String = '';
  durationInSeconds = 5;
  hidePwd = true;
  isMSAuthLoading = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private msalService: MsalService
  ) {}

  ngOnInit(): void {
    this.msalService.instance
      .initialize()
      .then(() => {
        console.log('MSAL instance initialized');
      })
      .catch((error) => {
        console.error('MSAL initialization failed:', error);
      });
  }

  login() {
    this.msalService.loginRedirect().subscribe({
      next: (response) => {
        console.log('login success', response);
      },
      error: (err) => {
        console.log('err', err);
      },
    });
  }
 
  logout() {
    this.msalService.logout();
  }

  navigateToSignUp() {
    //navigate to signup screen
    this.router.navigate(['/signup']);
  }

  openSnackBar(message: string) {
    // this.notificationService.showSuccess(message, this.durationInSeconds);
  }

  setUserPermissions() {
    const userRoleId = localStorage.getItem('userRoleId');
    if (!userRoleId) return;
    // this.roleService.updateUserPermissionData(userRoleId);
  }

  loginWithMS() {
    // this.authService.microsoftLogin();
  }
}
