import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MsalService,
} from '@azure/msal-angular';
import {
  AuthenticationResult,
  InteractionRequiredAuthError,
} from '@azure/msal-browser';
import { MSALInstanceFactory } from './features/auth/components/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    MsalService,
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useValue: {
        loginFailedRoute: '/a/mailbox',
      },
    },
  ],
})
export class AppComponent implements OnInit {
  title = 'emailAutomationManagementFE';

  constructor(private msalService: MsalService, private router: Router) {}
  ngOnInit(): void {
    this.msalService.instance
      .initialize()
      .then(() => {
        console.log('MSAL instance initialized');

        this.msalService.instance
          .handleRedirectPromise()
          .then((response: AuthenticationResult | null) => {
            if (response) {
              console.log('Login successful:', response);
              this.router.navigate(['/a/mailbox']);
              // Set the active account after login
              this.msalService.instance.setActiveAccount(response.account);
              this.getAccessToken();
            } else {
              console.log('No login response');
            }
          })
          .catch((error) => {
            console.error('Error handling redirect:', error);
          });
      })
      .catch((error) => {
        console.error('MSAL initialization failed:', error);
      });
  }
  getAccessToken() {
    const request = {
      scopes: ['user.read'], // Example: request access for Microsoft Graph API
    };

    this.msalService.instance
      .acquireTokenSilent(request)
      .then((response) => {
        console.log('Access Token:', response.accessToken);
        localStorage.setItem('accessToken', response.accessToken);
        // Store the token if needed and use it for API calls
      })
      .catch((error) => {
        console.error('Error acquiring token silently:', error);
        if (error instanceof InteractionRequiredAuthError) {
          // Fallback to acquire token using popup if silent acquisition fails
          this.msalService.instance
            .acquireTokenPopup(request)
            .then((response) => {
              console.log('Access Token (popup):', response.accessToken);
            })
            .catch((popupError) => {
              console.error('Error acquiring token with popup:', popupError);
            });
        }
      });
  }
}
