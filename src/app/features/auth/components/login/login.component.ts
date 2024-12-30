import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatIconModule,ReactiveFormsModule,CommonModule,MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
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
  //  private authService: AuthService,
//    private notificationService: NotificationService,
  //  private roleService: RolesServiceService,
   // private commonService: CommonService
  ) {}
  ngOnInit(): void {}

  onSubmit() {
    this.openSnackBar('Please wait while we sign you in');
    // if (this.loginForm.valid) {
    //   this.commonService.setLoading(true);
    //   this.authService
    //     .login(this.loginForm.value)

    //     .subscribe({
    //       next: (response: any) => {
    //         const token_type = response.token_type;
    //         const token = response.token;
    //         const username = response.first_name;
    //         const userEmail = response.email;
    //         const userRoleId = response.role_id;
    //         const userId = response.id;
    //         const roleTitle = response.role_title;
    //         const lastLogin = response.last_login;
    //         if (token_type && token) {
    //           this.commonService.setLoading(false);
    //           const authToken = `${token_type} ${token}`;
    //           localStorage.setItem('currentUser', authToken);
    //           localStorage.setItem('username', username);
    //           localStorage.setItem('userEmail', userEmail);
    //           localStorage.setItem('userRoleId', userRoleId);
    //           localStorage.setItem('loginMethod', 'normal');
    //           localStorage.setItem('userId', userId);
    //           localStorage.setItem('roleTitle', roleTitle);
    //           localStorage.setItem('lastLogin', lastLogin);
    //           this.setUserPermissions();

    //           this.router.navigate(AppRoutingSettings.getRouteFor.useCases());
    //           this.openSnackBar(
    //             `Hi ${username} you have successfully logged in`
    //           );
    //         }
    //       },
    //       error: (error) => {
    //         console.log(error);
    //         this.commonService.setLoading(false);
    //         if (error.status && error.statusText) {
    //           this.openSnackBar(`${error.status}: ${error.statusText}`);
    //         } else {
    //           this.openSnackBar(`Something went wrong, Please try again!`);
    //         }
    //       },
    //     });
    // }
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
