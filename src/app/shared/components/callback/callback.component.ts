import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.scss'
})
export class CallbackComponent {
  
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Capture the authorization code from the URL
    this.route.queryParams.subscribe(params => {
      const authCode = params['code'];
      if (authCode) {
        // Now you have the authorization code
        console.log('Authorization code:', authCode);
        // You can now exchange the auth code for access tokens
        this.exchangeAuthCodeForTokens(authCode);
      }
    });
  }

  private exchangeAuthCodeForTokens(authCode: string) {
    const tokenUrl = 'https://login.microsoftonline.com/common/oauth2/v2.0/token';
    const clientId = 'c3bea760-6fce-451b-bcc9-c62e1fa87d70';  // Your client ID
    const clientSecret = 'your-client-secret';  // If you have a client secret (for confidential apps)
    const redirectUri = 'http://localhost:4200/callback';  // Your redirect URI

    const requestBody = new URLSearchParams();
    requestBody.set('client_id', clientId);
    requestBody.set('client_secret', clientSecret);  // If applicable
    requestBody.set('code', authCode);
    requestBody.set('grant_type', 'authorization_code');
    requestBody.set('redirect_uri', redirectUri);
    requestBody.set('scope', 'Mail.Read Mail.Send User.Read offline_access openid profile');

    fetch(tokenUrl, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Tokens:', data);
        // Save the tokens (access_token, refresh_token) in localStorage or state
      })
      .catch(error => console.error('Error exchanging auth code for tokens:', error));
  }
}
