import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PublicClientApplication } from '@azure/msal-browser';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { }
   

  loginn(data:any){
    return this.http.get("https://hackathon-nvmail.onrender.com/NVMail/login")
  }
  private clientId = 'c3bea760-6fce-451b-bcc9-c62e1fa87d70';  // Your client ID
  private redirectUri = 'http://localhost:4200/a/mailbox';  // Change this to your redirect URI
  private scopes = 'Mail.Read Mail.Send User.Read offline_access openid profile';
  private authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${this.clientId}&response_type=code&scope=${this.scopes}&redirect_uri=${this.redirectUri}`;

  login(data:any){
    console.log('login');
    window.open(this.authUrl, '_blank', 'width=500,height=600');
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
}
