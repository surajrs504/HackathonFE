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
    // MsalService,
    // {
    //   provide: MSAL_INSTANCE,
    //   useFactory: MSALInstanceFactory,
    // },
    // {
    //   provide: MSAL_GUARD_CONFIG,
    //   useValue: {
    //     loginFailedRoute: '/login',
    //   },
    // },
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

  ngOnInit(): void {}

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
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
