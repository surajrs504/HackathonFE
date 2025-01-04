import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { PublicClientApplication } from '@azure/msal-browser';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private msalService: MsalService) {}

  private clientId = 'c3bea760-6fce-451b-bcc9-c62e1fa87d70'; // Your client ID
  private redirectUri = 'http://localhost:4200/a/mailbox'; // Change this to your redirect URI
  private scopes =
    'Mail.Read Mail.Send User.Read offline_access openid profile';
  private authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${this.clientId}&response_type=code&scope=${this.scopes}&redirect_uri=${this.redirectUri}`;

  login() {
    console.log('login');
    this.msalService.instance
      .initialize()
      .then(() => {
        console.log('MSAL instance initialized');
        this.msalService.loginRedirect().subscribe({
          next: (response) => {
            console.log('login success', response);
          },
          error: (err) => {
            console.log('err', err);
          },
        });
      })
      .catch((error) => {
        console.error('MSAL initialization failed:', error);
      });

    //window.open(this.authUrl, '_blank', 'width=500,height=600');
    // const msalConfig = {
    //   auth: {
    //     clientId: 'c3bea760-6fce-451b-bcc9-c62e1fa87d70',
    //     authority: 'https://login.microsoftonline.com/common', // Or specific tenant ID
    //     redirectUri: 'http://localhost:4200',  // Your redirect URI
    //   },
    //   cache: {
    //     cacheLocation: 'localStorage',  // Can also be 'sessionStorage'
    //     storeAuthStateInCookie: true,   // Set to true if you need support for IE11
    //   },
    // };

    //  const msalInstance = new PublicClientApplication(msalConfig);
    // this.msalService.loginPopup({
    //   scopes: ['user.read', 'Mail.Read', 'Mail.Send'],

    // }).subscribe({
    //   next: (response) => {
    //     console.log('Logged in:', response);
    //   },
    //   error: (error) => {
    //     console.error('Login error:', error);
    //   }
    // })

    // this.msalService.acquireTokenSilent({
    //   scopes: ['user.read', 'Mail.Read', 'Mail.Send'],
    // }).subscribe({
    //   next: (response) => {console.log('Access token:', response.accessToken);},
    //   error: (error) => { console.error('Token acquisition error:', error);}
    // })
  }
  logout() {
    const homeAccountId = localStorage.getItem('homeAccountId');
    if (!homeAccountId) return;
    const currentAccount =
      this.msalService.instance.getAccountByHomeId(homeAccountId);
    if (!currentAccount) return;
    this.msalService.logoutRedirect({
      postLogoutRedirectUri: location.origin,
      account: currentAccount,
    });
    //this.msalService.logout();
  }
}
