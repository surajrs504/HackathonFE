import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MSAL_GUARD_CONFIG, MSAL_INSTANCE, MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { tokenInterceptor } from './core/interceptors/token/token.interceptor';
import { Configuration, PublicClientApplication } from '@azure/msal-browser';
import { serverErrorInterceptor } from './core/interceptors/server-error/server-error.interceptor';
const msalConfig: Configuration = {
  auth: {
    clientId: 'c3bea760-6fce-451b-bcc9-c62e1fa87d70', // Application (client) ID from Azure
    authority:
      'https://login.microsoftonline.com/d25e697e-9987-4146-87ba-800be6fd457c', // Directory (tenant) ID from Azure
    redirectUri: 'https://nvmailautomation.netlify.app/a/mailbox', // Your app's redirect URI
  },
  cache: {
    cacheLocation: 'localStorage', // Choose 'sessionStorage' or 'localStorage'
    storeAuthStateInCookie: false, // Set to true for IE11 support
  },
};
export function MSALInstanceFactory() {
  return new PublicClientApplication(msalConfig);
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    MsalService,
    MsalBroadcastService,
    provideHttpClient(withInterceptors([tokenInterceptor,serverErrorInterceptor])),
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
};
